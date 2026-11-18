/** @param {{role: 'user' | 'assistant', content: string}[]} history @param {string} content */
export function buildHistory(history, content) {
  const messages = [...history.slice(-6), { role: /** @type {const} */ ('user'), content }];
  const bytes = () => new TextEncoder().encode(JSON.stringify({ messages })).byteLength;
  while (messages.length > 1 && (messages.reduce((sum, message) => sum + message.content.length, 0) > 6000 || bytes() > 8192)) {
    messages.splice(0, 2);
  }
  return messages;
}
