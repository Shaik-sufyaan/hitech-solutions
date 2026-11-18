// @ts-check
import { defineConfig } from 'astro/config';
import { localChatPlugin } from './server/local-chat.mjs';

// Static output: every marketing page is pre-rendered HTML.
// The employer-inquiry backend is added separately once a provider is chosen.
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [localChatPlugin()] },
});
