import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'vite';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
const root = fileURLToPath(new URL('../', import.meta.url));
const load = (file) => import(pathToFileURL(path.join(root, file)).href);
const seo = (await load('src/seoData.js')).default;
const { isKnownPage } = await load('removedUrls.js');
const data = await load('src/data.js');
const validation = await load('src/utils/formValidation.js');
const failures = [];
let checks = 0;
function check(name, callback) {
  checks++;
  try { callback(); } catch (error) { failures.push({ name, error: error.message.slice(0, 200) }); }
}
globalThis.window = { location: { search: '', pathname: '/' }, localStorage: { getItem() { return null; }, setItem() {} } };
globalThis.localStorage = window.localStorage;
const originalError = console.error;
console.error = (...args) => { if (!String(args[0]).includes('useLayoutEffect does nothing on the server')) originalError(...args); };
const server = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
const sources = {
  '/about': 'components/About.jsx', '/citizenship': 'Citizenship/CitizenshipOverview.jsx',
  '/residency': 'Residency/ResidencyOverview.jsx', '/realestate': 'Real Estate/RealEstateOverview.jsx',
  '/other-services': 'OtherService/OtherServiceOverview.jsx', '/pr': 'PR/PROverview.jsx',
  '/licenses': 'components/LicensePage.jsx', '/license': 'components/LicensePage.jsx',
  '/contact': 'components/ContactPage.jsx', '/login': 'components/LoginPage.jsx', '/admin': 'components/AdminPanel.jsx',
};
const prefixes = {
  citizenship: 'Citizenship/CitizenshipPage.jsx', residency: 'Residency/ResidencyPage.jsx',
  realestate: 'Real Estate/RealEstatePage.jsx', services: 'OtherService/OtherservicePage.jsx',
  pr: 'PR/PR_page.jsx', policies: 'components/PolicyPage.jsx',
};
const brokenAssets = new Map();
const brokenLinks = new Map();
let pages = 0;
function inspect(html, route) {
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1].replace(/&amp;/g, '&');
    if (!url.startsWith('/')) continue;
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    if (/\.[a-z0-9]+$/i.test(pathname)) {
      if (!fs.existsSync(path.join(root, 'public', pathname))) brokenAssets.set(pathname, route);
    } else if (!isKnownPage(pathname)) brokenLinks.set(pathname, route);
  }
  for (const match of html.matchAll(/url\(([^)]+)\)/g)) {
    const url = match[1].replace(/&quot;|&#x27;|['"]/g, '');
    if (url.startsWith('/') && !fs.existsSync(path.join(root, 'public', decodeURIComponent(url)))) brokenAssets.set(url, route);
  }
}
try {
  for (const route of [...new Set([...Object.keys(seo), '/license', '/login', '/admin'])]) {
    check(`known route ${route}`, () => assert(isKnownPage(route)));
    if (route === '/' || route === '/residency/spain') continue;
    const prefix = route.split('/')[1];
    const module = sources[route] || prefixes[prefix];
    if (!module) { failures.push({ name: `route ${route}`, error: 'No matching React route component' }); continue; }
    try {
      const { default: Component } = await server.ssrLoadModule(`/src/${module}`);
      const html = renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(Routes, null,
        React.createElement(Route, { path: sources[route] ? route : `/${prefix}/:slug`, element: React.createElement(Component) }))));
      check(`render ${route}`, () => assert(!/Country not found|Location not found|Service not found|Policy not found/.test(html)));
      inspect(html, route); pages++;
    } catch (error) { failures.push({ name: `render ${route}`, error: error.message }); }
  }
  for (const name of ['Navbar', 'Hero', 'Destinations', 'Services', 'Properties', 'success_story', 'Testimonials', 'Team', 'FAQ', 'Contact', 'Footer', 'ChatBot']) {
    try {
      const { default: Component } = await server.ssrLoadModule(`/src/components/${name}.jsx`);
      const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(Component)));
      inspect(html, `homepage:${name}`);
      check(`homepage ${name} hides Spain residency`, () => assert(!html.includes('/residency/spain')));
    } catch (error) { failures.push({ name: `homepage ${name}`, error: error.message }); }
  }
  for (const [asset, route] of brokenAssets) failures.push({ name: `asset ${asset}`, error: `Missing; referenced by ${route}` });
  for (const [link, route] of brokenLinks) failures.push({ name: `link ${link}`, error: `Unknown route; referenced by ${route}` });
  const sitemap = fs.readFileSync(path.join(root, 'backend/seo/sitemap.xml'), 'utf8');
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) check(`sitemap ${match[1]}`, () => assert(isKnownPage(new URL(match[1]).pathname)));
  for (const menu of ['CITIZENSHIP_MENU', 'RESIDENCY_MENU', 'REALESTATE_MENU', 'PR_MENU', 'OTHERSERVICES_MENU']) {
    for (const item of data[menu].groups.flatMap((group) => group.items)) check(`menu ${item.link}`, () => assert(isKnownPage(item.link)));
  }
  check('Spain hidden', () => assert(!data.RESIDENCY_MENU.groups.flatMap((group) => group.items).some((item) => item.name === 'Spain')));
  for (const lang of ['hi', 'fr', 'de', 'zh-CN']) check(`${lang} dictionary parses`, () => assert(Object.keys(JSON.parse(fs.readFileSync(path.join(root, `src/i18n/${lang}.json`)))).length > 0));
  for (const [file, tokens] of [
    ['src/programmeFactsheets.js', ['USD 350,000', 'USD 800,000', 'expressions of interest', 'aged 16 and older', 'at least three years', '6–8 months', '€9,360', '€2,808']],
  ]) for (const token of tokens) check(`factsheet ${token}`, () => assert(fs.readFileSync(path.join(root,file),'utf8').includes(token)));
  const css = fs.readFileSync(path.join(root,'src/index.css'),'utf8');
  for(const match of css.matchAll(/url\(\s*['"]?(\/[^)'"\s]+)['"]?\s*\)/g)) check(`CSS asset ${match[1]}`,()=>assert(fs.existsSync(path.join(root,'public',decodeURIComponent(match[1])))));
  for (const [phone, code] of [['9345678120', '+91'], ['2125550186', '+1'], ['4052871', '+1-473']]) check(`valid phone ${code}`, () => assert(validation.isValidPhone(phone, code)));
  for (const phone of ['1111111111', '1234567890', 'abcd']) check(`invalid phone ${phone}`, () => assert(!validation.isValidPhone(phone, '+91')));
  check('valid email', () => assert(validation.isValidEmail('qa@valid.test')));
  for (const email of ['not-an-email', 'qa@example.com', 'x@mailinator.com']) check(`invalid email ${email}`, () => assert(!validation.isValidEmail(email)));
  const form = { program: 'Citizenship of Argentina', salutation: 'Mr', firstName: 'QA', lastName: 'User', phoneCode: '+91', phone: '9345678120', email: 'qa@valid.test', nationality: 'India', residence: 'India' };
  const dateFunction=fs.readFileSync(path.join(root,'src/components/AdminPanel.jsx'),'utf8').match(/function todayISO\(\) \{[\s\S]*?\n\}/)?.[0];
  class IndiaBoundaryDate extends Date {
    constructor(){super('2026-10-23T20:00:00Z');}
    getFullYear(){return 2026;} getMonth(){return 9;} getDate(){return 24;}
  }
  check('admin custom date uses local calendar day',()=>assert.equal(vm.runInNewContext(`${dateFunction};todayISO()`,{Date:IndiaBoundaryDate}), '2026-10-24'));
  check('complete form', () => assert(validation.validateForm(form).isValid));
  check('missing fields', () => assert(!validation.validateForm({}).isValid));
  check('PR English required', () => assert(!validation.validateForm({ ...form, program: 'Australia PR' }, true).isValid));
  const oldFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: true }) });
    const success = await validation.submitContactForm(form);
    check('submit success', () => assert(success.success));
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false, error: 'Unable to save' }) });
    const refused = await validation.submitContactForm(form);
    check('API refusal must not show success', () => assert(!refused.success));
    globalThis.fetch = async () => ({ ok: true, json: async () => {throw new Error('HTML instead of JSON');} });
    const malformed = await validation.submitContactForm(form);
    check('malformed API response must not show success', () => assert(!malformed.success));
  } finally { globalThis.fetch = oldFetch; }
} finally { console.error = originalError; await server.close(); }
const result = { pages, checks, failures };
fs.writeFileSync(path.join(root, 'frontend-qa.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
