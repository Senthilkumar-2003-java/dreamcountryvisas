import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { isKnownPage } from './removedUrls.js';

function notFoundMiddleware(server, preview = false) {
  return async (req, res, next) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    // Leave APIs, development modules and static resources to their handlers.
    if (!['GET', 'HEAD'].includes(req.method) || isKnownPage(pathname) ||
        /^\/(?:api|src|node_modules|@[^/]+|static-files)(?:\/|$)/.test(pathname) ||
        (/\.[a-z0-9]+$/i.test(pathname) && !req.headers.accept?.includes('text/html'))) return next();
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'not-found-pages',
    configureServer(server) {
      server.middlewares.use(notFoundMiddleware(server));
    },
    configurePreviewServer(server) {
      server.middlewares.use(notFoundMiddleware(server, true));
    },
  }],
  build: {
    // Hostinger's shared-hosting security layer blocks requests to "/assets/*"
    // account-wide (a WordPress-attack-path rule) — rename the output dir to dodge it.
    assetsDir: 'static-files',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Served by the backend (per-domain), not from public/.
      '/robots.txt': 'http://localhost:3001',
      '/sitemap.xml': 'http://localhost:3001',
    },
  },
});
