import { DialogProps, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import axios from "axios";
import { EventEmitter } from "events";
import { useEffect } from "react";

/* 


*/

export const omitFalsyValues = (object: { [key: string]: any }) => {
  return Object.entries(object).reduce(
    (object, [key, value]) =>
      Boolean(value) ? { ...object, [key]: value } : object,
    {}
  );
};

export const ensureArray = <T>(x: T | T[]) => (Array.isArray(x) ? x : [x]);

/* 


*/
//SOURCE: https://rjzaworski.com/2019/10/event-emitters-in-typescript
type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;
interface Emitter<T extends EventMap> {
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

/* 


*/

export const closeDialog = (props: DialogProps) => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

/* 


*/

export const pluralize = (number: number, word: string) =>
  `${number} ${word}${number === 1 ? "" : "s"}`;

export const nameToInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substr(0, 2);

export const capitalize = (string: string) =>
  (string[0] || "").toUpperCase() +
  string.substring(1, string.length).toLowerCase();

export const capitalizeWords = (string: string) => {
  return string.split(" ").map(capitalize).join(" ");
};

/* 

*/

const gradientStep = (color: string, steps: number[]) =>
  steps.map((step) => fade(color, step)).join(", ");

export const makeFadeToBackgroundCss = (
  theme: Theme,
  steps: number[]
) => `linear-gradient(
    ${gradientStep(theme.palette.background.default, steps)}
  )`;

/* 

*/

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/* 

*/

export const makeCancelable = <T>(promise: Promise<T>) => {
  const source = axios.CancelToken.source();
  //@ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };
  return promise;
};

/* 

*/

//SOURCE: https://stackoverflow.com/questions/10614481/disable-double-tap-zoom-option-in-browser-on-touch-devices
//@ts-ignore
export function preventZoom(e) {
  var t2 = e.timeStamp;
  var t1 = e.currentTarget.dataset.lastTouch || t2;
  var dt = t2 - t1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}
