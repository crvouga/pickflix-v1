import { EventEmitter } from "events";
import { useEffect } from "react";

//SOURCE: https://rjzaworski.com/2019/10/event-emitters-in-typescript

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;

type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params?: T[K]): void;
}

export const createEventEmitter = <T extends EventMap>(): Emitter<T> => {
  return new EventEmitter();
};

export const useListener = <T extends EventMap, K extends EventKey<T>>(
  eventEmitter: Emitter<T>,
  eventName: K,
  fn: EventReceiver<T[K]>
) => {
  return useEffect(() => {
    eventEmitter.on(eventName, fn);
    return () => {
      eventEmitter.off(eventName, fn);
    };
  }, []);
};
