import test from 'node:test';
import assert from 'node:assert/strict';
import { buildHistory } from '../src/lib/chat-history.mjs';

test('drops oldest complete exchanges to fit the character budget', () => {
  const history = Array.from({ length: 6 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: String(i).repeat(1000) }));
  const result = buildHistory(history, 'new'.repeat(300));
  assert.equal(result.length, 5);
  assert.equal(result[0].content, '2'.repeat(1000));
  assert.equal(result.at(-1).content, 'new'.repeat(300));
});
test('drops complete exchanges to fit multibyte serialized JSON', () => {
  const history = Array.from({ length: 6 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: '界'.repeat(1000) }));
  const result = buildHistory(history, '界'.repeat(1000));
  assert.ok(new TextEncoder().encode(JSON.stringify({ messages: result })).length <= 8192);
  assert.equal(result.length, 1);
  assert.equal(result[0].role, 'user');
});
test('preserves ordinary context and never mutates stored history', () => {
  const history = [{ role: 'user', content: 'hello' }, { role: 'assistant', content: 'hi' }];
  assert.deepEqual(buildHistory(history, 'cloud'), [...history, { role: 'user', content: 'cloud' }]);
  assert.equal(history.length, 2);
});
