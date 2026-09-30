import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { createPersistedStore, jsonCodec } from '../src/lib/persistedStore';

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((n) => typeof n === 'number');

const codec = jsonCodec<number[]>([], isNumberArray);

function installFakeWindow(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  const localStorage = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
  (globalThis as { window?: unknown }).window = {
    localStorage,
    addEventListener() {},
    removeEventListener() {},
  };
  return data;
}

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

test('jsonCodec falls back for missing, corrupt or wrongly shaped data', () => {
  assert.deepEqual(codec.parse(null), []);
  assert.deepEqual(codec.parse('{not json'), []);
  assert.deepEqual(codec.parse('{"a":1}'), []);
  assert.deepEqual(codec.parse('["x"]'), []);
  assert.deepEqual(codec.parse('[1,2]'), [1, 2]);
});

test('on the server the store only ever returns the server value', () => {
  const store = createPersistedStore('nums', [7], codec);
  assert.deepEqual(store.get(), [7]);
  assert.deepEqual(store.getServerSnapshot(), [7]);
});

test('in the browser it reads the saved value and keeps the server snapshot for hydration', () => {
  installFakeWindow({ nums: '[1,2,3]' });
  const store = createPersistedStore('nums', [], codec);
  assert.deepEqual(store.get(), [1, 2, 3]);
  assert.deepEqual(store.getServerSnapshot(), []);
  assert.equal(store.get(), store.get(), 'snapshot must be referentially stable');
});

test('set persists the value and notifies subscribers', () => {
  const data = installFakeWindow();
  const store = createPersistedStore('nums', [], codec);
  let calls = 0;
  const unsubscribe = store.subscribe(() => calls++);

  store.set((prev) => [...prev, 4]);
  assert.deepEqual(store.get(), [4]);
  assert.equal(data.get('nums'), '[4]');
  assert.equal(calls, 1);

  unsubscribe();
  store.set([5]);
  assert.equal(calls, 1, 'unsubscribed listeners are not called');
});
