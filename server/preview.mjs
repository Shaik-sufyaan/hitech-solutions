// Astro's static preview omits user Vite plugins. Use Vite preview directly so
// local /api/chat and the built static pages are served from the same origin.
import { preview } from 'vite';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { localChatPlugin } from './local-chat.mjs';

const { values } = parseArgs({ options: { host: { type: 'string', default: '127.0.0.1' }, port: { type: 'string', default: '4323' } } });
const output = resolve('dist');
const pageRoutes = {
  name: 'static-directory-pages',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      try {
        const url = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname);
        const file = resolve(output, `.${pathname}`, 'index.html');
        if (file.startsWith(output + sep) && existsSync(file)) {
          req.url = `${url.pathname.replace(/\/$/, '')}/index.html${url.search}`;
        }
      } catch { /* Invalid paths are left to the static server's error handling. */ }
      next();
    });
  },
};
const server = await preview({
  configFile: false,
  appType: 'mpa',
  build: { outDir: 'dist' },
  preview: { host: values.host, port: Number(values.port), strictPort: true },
  plugins: [localChatPlugin(), pageRoutes],
});
server.printUrls();
