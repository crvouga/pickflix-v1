import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";

import { ICache } from "./types";

export class RedisCache<K extends string, T> implements ICache<K, T> {
  keyv: Keyv;

  constructor({ connectionString }: { connectionString: string }) {
    const store = new KeyvRedis(connectionString);

    this.keyv = new Keyv({
      store: store,
    });

    this.keyv.on("error", (error) => {
      console.error(error);
      throw error;
    });
  }

  async set(key: K, value: T, timeToLive?: number) {
    this.keyv.set(key, value, timeToLive);
  }

  async get(key: K): Promise<T> {
    return this.keyv.get(key);
  }
}
