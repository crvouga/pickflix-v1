export interface ICache<K extends string, T> {
  set(key: K, value: T, timeToLive?: number): Promise<void>;
  get(key: K): Promise<T | undefined>;
}
