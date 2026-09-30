import { useSyncExternalStore } from 'react';

/**
 * A tiny localStorage-backed store for use with `useSyncExternalStore`.
 *
 * The server (and the hydration render) always sees `serverValue`, and the
 * browser switches to the saved value right after hydration. That keeps the
 * server HTML and the first client render identical, so the navbar badges and
 * other persisted UI no longer cause hydration mismatches.
 */

export interface StorageCodec<T> {
  /** Turn the raw stored string (or `null` when nothing is saved) into a value. */
  parse(raw: string | null): T;
  serialize(value: T): string;
}

export interface PersistedStore<T> {
  get(): T;
  getServerSnapshot(): T;
  set(next: T | ((prev: T) => T)): void;
  subscribe(listener: () => void): () => void;
}

/** JSON codec that falls back when the saved data is missing, corrupt or the wrong shape. */
export function jsonCodec<T>(fallback: T, isValid: (value: unknown) => value is T): StorageCodec<T> {
  return {
    parse(raw) {
      if (raw === null) return fallback;
      try {
        const parsed: unknown = JSON.parse(raw);
        return isValid(parsed) ? parsed : fallback;
      } catch {
        return fallback;
      }
    },
    serialize: (value) => JSON.stringify(value),
  };
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function createPersistedStore<T>(
  key: string,
  serverValue: T,
  codec: StorageCodec<T>
): PersistedStore<T> {
  let value = serverValue;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === 'undefined') return;
    loaded = true;
    let raw: string | null = null;
    try {
      raw = getStorage()?.getItem(key) ?? null;
    } catch {
      raw = null;
    }
    value = codec.parse(raw);
  };

  const notify = () => listeners.forEach((listener) => listener());

  // Keep other open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== key) return;
    value = codec.parse(event.newValue);
    loaded = true;
    notify();
  };

  return {
    get() {
      load();
      return value;
    },
    getServerSnapshot: () => serverValue,
    set(next) {
      load();
      value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;
      try {
        getStorage()?.setItem(key, codec.serialize(value));
      } catch (error) {
        console.error(`Failed to save "${key}" to localStorage`, error);
      }
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1 && typeof window !== 'undefined') {
        window.addEventListener('storage', onStorage);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== 'undefined') {
          window.removeEventListener('storage', onStorage);
        }
      };
    },
  };
}

export function usePersistedStore<T>(store: PersistedStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}

const subscribeNever = () => () => {};

/** `false` on the server and during hydration, `true` once the browser has taken over. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}
