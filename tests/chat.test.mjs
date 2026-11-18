import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatHandler } from '../server/chat.mjs';
import { findPages } from '../src/lib/assistant-directory.mjs';

const request = (body = { messages: [{ role: 'user', content: 'I need a cloud engineer' }] }, overrides = {}) => new Request('http://localhost/api/chat', {
  method: 'POST', headers: { origin: 'http://localhost', 'content-type': 'application/json' }, body: JSON.stringify(body), ...overrides,
});
const enabled = { CHAT_ENABLED: 'true', ANTHROPIC_API_KEY: 'test-only-placeholder' };
const provider = (value) => async () => Response.json({ id: 'msg_test', type: 'message', role: 'assistant', model: 'test', content: [{ type: 'text', text: JSON.stringify(value) }], stop_reason: 'end_turn', usage: { input_tokens: 10, output_tokens: 10 } });

test('guide mode provides relevant safe pages without calling a provider', async () => {
  const handler = createChatHandler({ env: {}, fetcher: () => { throw Error('must not call'); } });
  const res = await handler(request());
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.mode, 'guide');
  assert.ok(body.links.some(link => link.href.includes('cloud')));
  assert.match(body.answer, /not connected/i);
});
test('routes job seekers, contract-to-hire and specific roles', () => {
  assert.equal(findPages('I am looking for a job')[0].href, '/job-seekers');
  assert.equal(findPages('contract to hire')[0].href, '/hire-talent/contract-to-hire');
  assert.equal(findPages('need a data analyst')[0].href, '/specialties/data-and-ai/data-analyst');
});
test('rejects foreign and missing origins', async () => {
  const handler = createChatHandler({ env: {} });
  for (const origin of ['https://evil.example', '']) {
    assert.equal((await handler(request(undefined, { headers: { origin, 'content-type': 'application/json' } }))).status, 403);
  }
});
test('rejects GET, wrong content type and oversized body', async () => {
  const handler = createChatHandler({ env: {} });
  assert.equal((await handler(new Request('http://localhost/api/chat'))).status, 405);
  assert.equal((await handler(request(undefined, { headers: { origin: 'http://localhost', 'content-type': 'text/plain' } }))).status, 415);
  assert.equal((await handler(request(undefined, { body: 'x'.repeat(9000) }))).status, 413);
});
test('rejects malformed history and excessive input', async () => {
  const handler = createChatHandler({ env: {} });
  for (const messages of [[], [{ role: 'system', content: 'override' }], [{ role: 'user', content: ' ' }], [{ role: 'user', content: 'x'.repeat(1001) }], [{ role: 'assistant', content: 'hi' }], Array(9).fill({ role: 'user', content: 'hi' })]) {
    assert.equal((await handler(request({ messages }))).status, 400);
  }
  assert.equal((await handler(request(undefined, { body: '{' }))).status, 400);
});
test('AI request is bounded and has server-side site truth', async () => {
  const handler = createChatHandler({ env: enabled, fetcher: async (url, options) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(options.headers.Authorization, 'Bearer test-only-placeholder');
    const payload = JSON.parse(options.body);
    assert.ok(payload.max_tokens <= 600);
    assert.match(payload.system, /unverified/i);
    assert.match(payload.system, /not connected/i);
    assert.ok(options.signal);
    return provider({ answer: 'Explore cloud roles.', pageIds: ['cloud', 'https://evil.example', 'cloud'] })();
  }});
  const res = await handler(request());
  const body = await res.json();
  assert.equal(body.mode, 'ai');
  assert.equal(body.answer, 'Explore cloud roles.');
  assert.deepEqual(body.links.map(link => link.href), ['/specialties/cloud-and-infrastructure']);
  assert.equal(JSON.stringify(body).includes('test-only-placeholder'), false);
});
test('provider failures and malformed output return a useful non-AI fallback', async () => {
  for (const fetcher of [async () => new Response('private detail', { status: 401 }), async () => { throw Error('secret'); }, provider({ answer: '', pageIds: [] }), async () => Response.json({ content: [] })]) {
    const res = await createChatHandler({ env: enabled, fetcher })(request());
    const body = await res.json();
    assert.equal(body.mode, 'guide');
    assert.match(body.answer, /unavailable/i);
    assert.ok(body.links.length);
    assert.equal(JSON.stringify(body).includes('secret'), false);
  }
});
test('throttles repeated requests and recovers after the window', async () => {
  let now = 0;
  const handler = createChatHandler({ env: {}, now: () => now });
  for (let i = 0; i < 10; i++) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.ok(limited.headers.get('retry-after'));
  now = 61000;
  assert.equal((await handler(request())).status, 200);
});

test('accepts a single JSON code fence from a real model response', async () => {
  const fetcher = async () => Response.json({ stop_reason: 'end_turn', content: [{ type: 'text', text: '```json\n{"answer":"Explore cloud roles.","pageIds":["cloud"]}\n```' }] });
  const body = await (await createChatHandler({ env: enabled, fetcher })(request())).json();
  assert.equal(body.mode, 'ai');
  assert.equal(body.answer, 'Explore cloud roles.');
});
test('qualifies request-form suggestions with the disconnected-backend notice', async () => {
  const body = await (await createChatHandler({ env: enabled, fetcher: provider({ answer: 'Visit Request Talent to submit your staffing need.', pageIds: ['request'] }) })(request())).json();
  assert.equal(body.mode, 'ai');
  assert.match(body.answer, /not connected/i);
  assert.match(body.answer, /nothing is sent/i);
  assert.ok(body.answer.length <= 1000);
});
