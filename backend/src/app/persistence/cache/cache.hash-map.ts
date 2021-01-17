import { ICache } from "./types";

export class HashMapCache<K extends string, T> implements ICache<K, T> {
  hashMap: Map<K, T>;

  constructor() {
    this.hashMap = new Map<K, T>();
  }

  async set(key: K, value: T, timeToLive?: number) {
    this.hashMap.set(key, value);
  }

  async get(key: K) {
    return this.hashMap.get(key);
  }
}
