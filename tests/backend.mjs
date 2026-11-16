import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import dns from 'node:dns';
import http from 'node:http';
import jwt from 'jsonwebtoken';
import zlib from 'node:zlib';
const root = fileURLToPath(new URL('../', import.meta.url));
Object.assign(process.env, { JWT_SECRET: 'qa-only-secret-not-a-production-credential', ADMIN_EMAIL: 'admin@qa.invalid', ADMIN_PASSWORD: 'QA-only-password-7349', RESEND_API_KEY: 'qa-mocked', MAIL_TO_EMAIL: 'team@qa.invalid', MAIL_FROM_EMAIL: 'qa@qa.invalid', PORT: '0' });
globalThis.__dcQa = { queries: [], emails: [], dbFailure: false, mailFailure: false, confirmFailure: false };
dns.promises.resolveMx = async (domain) => { if (domain === 'no-mx.invalid') throw Object.assign(new Error('No MX'), {code:'ENODATA'}); return [{exchange:'mail.qa.invalid',priority:10}]; };
const { testServer } = await import('../backend/server.js');
await new Promise((resolve) => testServer.listening ? resolve() : testServer.once('listening', resolve));
const { loginLimiter, contactLimiter } = await import('../backend/middleware/rateLimit.js');
const base = `http://127.0.0.1:${testServer.address().port}`;
const failures = []; let checks = 0;
function check(name, callback) { checks++; try {callback();} catch(error){failures.push({name,error:error.message.slice(0,160)});} }
let resetRate = true;
async function request(url, body, headers = {}, method) {
  const response = await new Promise((resolve,reject)=>{
    const req=http.request(base+url,{method:method||(body===undefined?'GET':'POST'),headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...headers}},res=>{
      let text='';res.setEncoding('utf8');res.on('data',chunk=>text+=chunk);res.on('end',()=>resolve({status:res.statusCode,headers:new Headers(res.headers),text}));
    });req.on('error',reject);if(body!==undefined)req.write(JSON.stringify(body));req.end();
  });
  const text = response.text; let json;try{json=JSON.parse(text);}catch{}
  if(resetRate) for(const key of ['127.0.0.1','::ffff:127.0.0.1','::/56']) {loginLimiter.resetKey(key);contactLimiter.resetKey(key);}
  return { status:response.status, headers:response.headers, text, json };
}
try {
  const health=await request('/health');check('health', () => assert.equal(health.status,200));
  for (const route of ['/','/citizenship/argentina','/citizenship/grenada','/residency/latvia','/realestate/latvia']) {
    const res=await request(route);check(`GET ${route}`,()=>assert.equal(res.status,200));
  }
  // Senior QA Suite: Verify WordPress / PHP paths are permanently dead (HTTP 410 Gone with noindex)
  const wpPaths = [
    '/wp-admin/admin-ajax.php',
    '/wp-admin/',
    '/wp-login.php',
    '/index.php',
    '/wp-content/themes/routex-child/style.css',
    '/wp-content/plugins/popup-maker/',
    '/wp-includes/js/wp-emoji-release.min.js?ver=7.0.3',
    '/wp-json/',
    '/comments/feed/',
    '/author/sangita/',
    '/cdn-cgi/l/email-protection',
  ];
  for (const wp of wpPaths) {
    const res = await request(wp);
    check(`WordPress/PHP path ${wp} 410 gone`, () => {
      assert.equal(res.status, 410);
      assert(res.headers.get('x-robots-tag')?.includes('noindex'));
    });
  }

  // Senior QA Suite: Verify Old Content URLs permanently 301 redirect to exact new React pages
  const legacyMappings = [
    ['/about-us/', '/about'],
    ['/refund-policy/', '/policies/refund-policy'],
    ['/terms/', '/policies/terms-of-service'],
    ['/home/', '/'],
    ['/index.html', '/'],
    ['/index', '/'],
    ['/visas/', '/'],
    ['/story/', '/'],
    ['/pay-online/', '/contact'],
    ['/antigua-and-barbuda-citizenship-by-investment/', '/citizenship/antigua-barbuda'],
    ['/st-kitts-and-nevis-citizenship-by-investment/', '/citizenship/st-kitts-nevis'],
    ['/malta-citizenship-by-investment/', '/citizenship/malta'],
    ['/latvia-golden-visa-investment-program/', '/residency/latvia'],
    ['/canada-immigration/canada-express-entry', '/pr/canada'],
    ['/canada-permanent-residency-visa/', '/pr/canada'],
    ['/canada-startup-visa/', '/pr/canada'],
    ['/quebec-immigrant-investor-program-3/', '/pr/canada'],
    ['/ontario-immigrant-nominee-program', '/pr/canada'],
    ['/students-visa-for-canada', '/services/study-visas'],
    ['/tourist-visa/', '/services/business-visas'],
    ['/australia-permanent-residency-visa/', '/pr/australia'],
    ['/australia-immigration', '/pr/australia'],
    ['/subclass-491', '/pr/australia'],
    ['/citizenship-by-investment-cbi/', '/citizenship'],
    ['/Coachings/job-assistance/', '/other-services'],
    ['/Coachings/', '/other-services'],
  ];
  for (const [oldUrl, newUrl] of legacyMappings) {
    const res = await request(oldUrl);
    check(`Legacy redirect ${oldUrl} -> ${newUrl}`, () => {
      assert.equal(res.status, 301);
      assert.equal(res.headers.get('location'), newUrl);
    });
  }

  // Senior QA Suite: Verify arbitrary wrong / non-existent URLs redirect cleanly to home page
  for (const fakeUrl of ['/this-page-does-not-exist', '/fake-typo-url', '/some/nonexistent/subpath']) {
    const res = await request(fakeUrl);
    check(`Arbitrary invalid URL ${fakeUrl} redirects to /`, () => {
      assert.equal(res.status, 302);
      assert.equal(res.headers.get('location'), '/');
    });
  }

  const inHome=await request('/',undefined,{Host:'dreamcountryvisas.in'});check('in domain home canonical',()=>{assert.equal(inHome.status,200);assert(inHome.text.includes('<link rel="canonical" href="https://dreamcountryvisas.in/" />'));});
  const comHome=await request('/',undefined,{Host:'dreamcountryvisas.com'});check('com domain home canonical',()=>{assert.equal(comHome.status,200);assert(comHome.text.includes('<link rel="canonical" href="https://dreamcountryvisas.com/" />'));});
  const unknownApi=await request('/api/unknown');check('unknown API 404',()=>assert.equal(unknownApi.status,404));
  const metadata=(await import('../src/seoData.js')).default;
  for(const route of Object.keys(metadata).filter(route=>route!=='/residency/spain')) {
    const page=await request(route);check(`production route ${route}`,()=>assert.equal(page.status,route==='/license'?308:200));
  }
  const indexHtml=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
  for(const match of indexHtml.matchAll(/(?:src|href)="(\/static-files\/[^"\s]+)"/g)) {
    const asset=await request(match[1]);check(`built asset ${match[1]}`,()=>{assert.equal(asset.status,200);assert(!asset.headers.get('content-type')?.includes('text/html'));});
  }
  const spain=await request('/residency/spain');check('Spain redirect',()=>{assert.equal(spain.status,302);assert.equal(spain.headers.get('location'),'/residency');});
  const variant=await request('/Citizenship/Argentina/');check('canonical path redirect',()=>{assert([301,302,307,308].includes(variant.status));assert.equal(variant.headers.get('location'),'/citizenship/argentina');});
  const alias=await request('/license?source=qa');check('license alias keeps query',()=>{assert.equal(alias.status,308);assert.equal(alias.headers.get('location'),'/licenses?source=qa');});
  const encoded=await request('/residency/%73pain');check('encoded hidden route redirects',()=>{assert.equal(encoded.status,302);assert.equal(encoded.headers.get('location'),'/residency');});
  for(const domain of ['dreamcountryvisas.com','dreamcountryvisas.in']) {
    const sm=await request('/sitemap.xml',undefined,{Host:domain});const rb=await request('/robots.txt',undefined,{Host:domain});
    check(`sitemap/robots ${domain}`,()=>{assert.equal(sm.status,200);assert(sm.text.includes(`https://${domain}/citizenship/argentina`));assert(sm.text.includes(`https://${domain}/citizenship/grenada`));assert(!sm.text.includes('/residency/spain'));assert(rb.text.includes(`https://${domain}/sitemap.xml`));});
  }
  const denied=await request('/api/auth/login',{email:'no@qa.invalid',password:'wrong'},{Origin:'https://untrusted.invalid'});check('CORS rejection',()=>assert.equal(denied.status,403));
  const login=await request('/api/auth/login',{email:'admin@qa.invalid',password:'QA-only-password-7349'});check('valid admin login',()=>{assert.equal(login.status,200);assert(login.json.token);});
  const token=login.json?.token;
  const invalid=await request('/api/auth/login',{email:{unexpected:true},password:'wrong'});check('invalid login types rejected',()=>assert([400,401].includes(invalid.status)));
  const anonymous=await request('/api/admin/submissions');check('admin auth required',()=>assert.equal(anonymous.status,401));
  const forged=await request('/api/admin/submissions',undefined,{Authorization:'Bearer invalid'});check('invalid JWT rejected',()=>assert.equal(forged.status,401));
  const visitorToken=jwt.sign({role:'visitor'},process.env.JWT_SECRET);
  const visitor=await request('/api/admin/submissions',undefined,{Authorization:`Bearer ${visitorToken}`});check('non-admin role rejected',()=>assert.equal(visitor.status,403));
  const expiredToken=jwt.sign({role:'admin'},process.env.JWT_SECRET,{expiresIn:-1});
  const expired=await request('/api/admin/submissions',undefined,{Authorization:`Bearer ${expiredToken}`});check('expired JWT rejected',()=>assert.equal(expired.status,401));
  const admin=await request('/api/admin/submissions?range=today',undefined,{Authorization:`Bearer ${token}`});check('admin submission list',()=>assert.equal(admin.status,200));
  for(const range of ['range=custom&from=bad&to=2026-10-24','range=custom&from=2026-10-24&to=2026-10-01','range=custom&from=2026-02-30&to=2026-03-01','range=custom']) { const result=await request(`/api/admin/submissions?${range}`,undefined,{Authorization:`Bearer ${token}`});check(`invalid range ${range}`,()=>assert.equal(result.status,400)); }
  const custom=await request('/api/admin/submissions?range=custom&from=2026-10-01&to=2026-10-24',undefined,{Authorization:`Bearer ${token}`});check('valid custom date range',()=>assert.equal(custom.status,200));
  const valid={source:'contact',program:'Citizenship of Argentina',salutation:'Mr',firstName:'QA',lastName:'User',phoneCode:'+91',phone:'9345678120',email:'qa@valid.test',nationality:'India',residence:'India',updates:false};
  for(const [name,body] of [['empty',{}],['wrong types',{...valid,email:{invalid:true}}],['bad phone',{...valid,phone:'abc'}],['bad email',{...valid,email:'a@@valid.test'}],['oversized',{...valid,firstName:'A'.repeat(101)}],['no MX',{...valid,email:'qa@no-mx.invalid'}]]) {
    const count=__dcQa.queries.length;const result=await request('/api/contact',body);check(`contact ${name} rejected before saving`,()=>{assert.equal(result.status,400);assert.equal(__dcQa.queries.length,count);});
  }
  const saved=await request('/api/contact',valid,{Origin:'https://dreamcountryvisas.in'});check('valid contact save + both emails + domain',()=>{assert.equal(saved.status,200);assert.equal(__dcQa.queries.at(-1).params.at(-1),'dreamcountryvisas.in');assert(__dcQa.emails.length>=2);});
  const chatbot=await request('/api/contact',{...valid,source:'chatbot',salutation:undefined,lastName:undefined});check('chatbot submission',()=>assert.equal(chatbot.status,200));
  const hidden=await request('/api/contact',{...valid,program:'Residence in Spain'});check('stale hidden programme submission rejected',()=>assert.equal(hidden.status,400));
  const caribbean=await request('/api/contact',{...valid,phoneCode:'+1-473',phone:'4052871'});check('Grenada country-code submission',()=>assert.equal(caribbean.status,200));
  await request('/api/contact',valid,{Referer:'https://dreamcountryvisas.attacker.invalid/'});
  check('confirmation links use official domains only',()=>{assert(__dcQa.emails.at(-1).html.includes('https://dreamcountryvisas.com'));assert(!__dcQa.emails.at(-1).html.includes('href="https://dreamcountryvisas.attacker.invalid'));});
  await request('/api/contact',{...valid,firstName:'<img src=x onerror=alert(1)>'});
  check('user input escaped in emails',()=>{assert(__dcQa.emails.at(-1).html.includes('&lt;img'));assert(!__dcQa.emails.at(-1).html.includes('<img src=x'));});
  __dcQa.confirmFailure=true;const confirm=await request('/api/contact',valid);__dcQa.confirmFailure=false;check('confirmation email failure preserves success',()=>assert.equal(confirm.status,200));
  __dcQa.mailFailure=true;const mail=await request('/api/contact',valid);__dcQa.mailFailure=false;check('saved contact must not fail when notification fails',()=>assert.equal(mail.status,200));
  __dcQa.dbFailure=true;const db=await request('/api/contact',valid);__dcQa.dbFailure=false;check('database failure generic error',()=>{assert.equal(db.status,500);assert(!db.text.includes('QA_PRIVATE'));});
  const malformed=await fetch(base+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"bad"'});check('malformed JSON 400',()=>assert.equal(malformed.status,400));await malformed.text();
  const large=await request('/api/contact',{...valid,firstName:'x'.repeat(150000)});check('oversized JSON 413',()=>assert.equal(large.status,413));
  // Safe regression: do not feed any compressed data to a vulnerable decoder.
  const originalBrotliDecoder=zlib.createBrotliDecompress;
  let decoderCalls=0;
  Object.defineProperty(zlib,'createBrotliDecompress',{configurable:true,value:()=>{decoderCalls++;throw new Error('Decoder must not run');}});
  try {
    for(const encoding of ['br','gzip','deflate']) {
      const compressed=await request('/api/contact',valid,{'Content-Encoding':encoding});
      check('compressed '+encoding+' JSON rejected before decompression',()=>{assert.equal(compressed.status,415);assert.equal(decoderCalls,0);});
    }
  } finally {Object.defineProperty(zlib,'createBrotliDecompress',{configurable:true,value:originalBrotliDecoder});}
  resetRate=false;
  for(const key of ['127.0.0.1','::ffff:127.0.0.1','::/56'])loginLimiter.resetKey(key);
  let limited;for(let index=0;index<6;index++)limited=await request('/api/auth/login',{email:'wrong@qa.invalid',password:'wrong'});
  check('login rate limiting',()=>assert.equal(limited.status,429));
  for(const key of ['127.0.0.1','::ffff:127.0.0.1','::/56'])contactLimiter.resetKey(key);
  for(let index=0;index<11;index++)limited=await request('/api/contact',{});
  check('contact rate limiting',()=>assert.equal(limited.status,429));
} finally { await new Promise((resolve)=>testServer.close(resolve)); }
const result={checks,failures,mockedDatabase:true,mockedEmail:true};fs.writeFileSync(path.join(root,'backend-qa.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(failures.length)process.exitCode=1;
