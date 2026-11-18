import { Readable } from 'node:stream';
import { loadEnv } from 'vite';
import { createChatHandler } from './chat.mjs';

export function localChatPlugin() {
  const install = (server) => {
    const env = { ...loadEnv('development', process.cwd(), ''), ...process.env };
    const handler = createChatHandler({ env });
    server.middlewares.use('/api/chat', async (req, res) => {
      try {
        const request = new Request(`http://${req.headers.host}/api/chat`, {
          method: req.method, headers: req.headers,
          ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Readable.toWeb(req), duplex: 'half' } : {}),
        });
        const response = await handler(request);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      } catch {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify({ error: 'Chat is temporarily unavailable. Please try again.' }));
      }
    });
  };
  return { name: 'local-chat-api', configureServer: install, configurePreviewServer: install };
}
