// Dream Country Visas — API Server (contact form, auth, admin dashboard)
// Runs on port 3001; Vite dev server proxies /api/* here.
//
// No top-level await anywhere in this module or its imports below — Hostinger's
// Node hosting loads the entry file via require(), which throws
// ERR_REQUIRE_ASYNC_MODULE on an ESM graph that uses top-level await.
import 'dotenv/config'; // load .env from project root (process cwd) — must run before db.js reads DB_* env vars
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import './db.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import { isKnownPage, normalizePagePath, getLegacyRedirect, isLegacyWordPressPath } from '../removedUrls.js';
import { isProgramVisible } from '../src/utils/programVisibility.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

// Only these origins may call the API from a browser. Add production
// domains here (or via CORS_ORIGINS in .env) before going live elsewhere.
const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://dreamcountryvisas.com',
  'https://www.dreamcountryvisas.com',
  'https://dreamcountryvisas.in',
  'https://www.dreamcountryvisas.in',
  'https://snow-partridge-646013.hostingersite.com', // temporary Hostinger test subdomain — remove once live on the real domain
];
const ALLOWED_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : DEFAULT_ORIGINS;

const app = express();
// Helmet's default CSP blocks third-party scripts — allow Google Analytics
// (hosts per Google's GA4 CSP guidance). Everything else keeps the defaults.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", 'https://*.googletagmanager.com'],
        connectSrc: [
          "'self'",
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://*.googletagmanager.com',
        ],
        imgSrc: ["'self'", 'data:', 'https://*.google-analytics.com', 'https://*.googletagmanager.com'],
      },
    },
  })
);
// Browser forms send ordinary JSON; reject compressed request bodies without
// invoking the Node.js Brotli/gzip decoders. Keep the hosting runtime patched.
app.use(express.json({ inflate: false }));

// CORS only applies to the API — the built frontend's own JS/CSS is fetched
// with `crossorigin` (Vite's default for module scripts), which sends an
// Origin header even for same-origin requests. Scoping this to /api avoids
// rejecting the site's own static assets when their origin isn't whitelisted.
const corsMiddleware = cors({
  origin(origin, callback) {
    // No Origin header (e.g. curl, server-to-server, Vite's own proxy) — allow.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

app.use('/api/contact', corsMiddleware, contactRoutes);
app.use('/api/auth', corsMiddleware, authRoutes);
app.use('/api/admin', corsMiddleware, adminRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// robots.txt and sitemap.xml are written for .com; when the request comes in
// on dreamcountryvisas.in, serve the same files with .in URLs so each domain
// advertises its own sitemap. They live in backend/seo/ rather than public/
// because Hostinger serves any file present in dist/ directly, without ever
// reaching this server.
const seoPath = path.join(__dirname, 'seo');
const isInDomain = (req) => /(^|\.)dreamcountryvisas\.in$/i.test(req.hostname || '');
const toInDomain = (text) => text.replace(/https:\/\/dreamcountryvisas\.com/g, 'https://dreamcountryvisas.in');

for (const [file, type] of [['robots.txt', 'text/plain'], ['sitemap.xml', 'application/xml']]) {
  app.get(`/${file}`, (req, res, next) => {
    fs.readFile(path.join(seoPath, file), 'utf8', (err, text) => {
      if (err) return next(err);
      const visibleText = file === 'sitemap.xml'
        ? text.replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (entry, url) =>
            isProgramVisible(new URL(url).pathname) ? entry : '')
        : text;
      res.type(type).send(isInDomain(req) ? toInDomain(visibleText) : visibleText);
    });
  });
}

// Redirect plain HTTP to HTTPS in production
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
  }
  next();
});

// Permanently retired WordPress and PHP paths -> HTTP 410 Gone (with noindex)
// so search engines immediately remove them from their index.
app.use((req, res, next) => {
  if (isLegacyWordPressPath(req.path)) {
    return res
      .status(410)
      .set('X-Robots-Tag', 'noindex, nofollow, noarchive')
      .type('text/plain')
      .send('This resource has been permanently removed.');
  }
  next();
});

// 301 Permanent Redirects for legacy WordPress content pages to matching new React pages
app.use((req, res, next) => {
  const legacyTarget = getLegacyRedirect(req.path);
  if (legacyTarget) {
    return res.redirect(301, legacyTarget);
  }
  next();
});

// Serve the built frontend (dist/) and fall back to index.html for
// React Router routes, without swallowing unmatched /api/* requests.
// Keep the hidden program's content intact and route existing links to the overview.
app.use((req, res, next) => {
  if (!['GET', 'HEAD'].includes(req.method) || !isKnownPage(req.path)) return next();
  const normalized = normalizePagePath(req.path);
  if (!isProgramVisible(normalized)) return res.redirect(302, '/residency');
  if (req.path !== normalized) return res.redirect(308, normalized + req.originalUrl.slice(req.path.length));
  return next();
});
app.use(express.static(distPath, { index: false }));
app.get(/^\/(?!api(?:\/|$)).*/, (req, res) => {
  if (isKnownPage(req.path)) {
    if (isInDomain(req)) {
      return fs.readFile(path.join(distPath, 'index.html'), 'utf8', (err, html) => {
        if (err) return res.sendFile(path.join(distPath, 'index.html'));
        const inHtml = html.replace(
          '<link rel="canonical" href="https://dreamcountryvisas.com/" />',
          '<link rel="canonical" href="https://dreamcountryvisas.in/" />'
        );
        res.type('html').send(inHtml);
      });
    }
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  return res.redirect(302, '/');
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err?.type === 'encoding.unsupported') {
    return res.status(415).json({ ok: false, error: 'Please send an uncompressed JSON request.' });
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'Please submit valid JSON contact details.' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, error: 'The submitted request is too large.' });
  }
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ ok: false, error: 'Not allowed by CORS.' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 Dream Country Visas API running → http://localhost:${PORT}`)
);
