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

/* 


*/
//SOURCE: https://stackoverflow.com/questions/41802259/javascript-deep-check-objects-have-same-keys
export const deepSameKeys = (o1: any, o2: any) => {
  // Both nulls = yes
  if (o1 === null && o2 === null) {
    return true;
  }
  // Get the keys of each object
  const o1keys = o1 === null ? [] : Object.keys(o1);
  const o2keys = o2 === null ? [] : Object.keys(o2);
  if (o1keys.length !== o2keys.length) {
    // Different number of own properties = not the same
    return false;
  }

  // At this point, one of two things is true:
  // A) `o1` and `o2` are both `!null`, or
  // B) One of them is `null` and the other has own "own" properties
  // The logic below relies on the fact we only try to use `o1` or
  // `o2` if there's at least one entry in `o1keys`, which we won't
  // given the guarantee above.

  // Handy utility function
  const hasOwn = Object.prototype.hasOwnProperty;

  // Check that the keys match and recurse into nested objects as necessary
  return o1keys.every((key) => {
    if (!hasOwn.call(o2, key)) {
      // Different keys
      return false;
    }
    // Get the values and their types
    const v1 = o1[key];
    const v2 = o2[key];
    const t1 = typeof v1;
    const t2 = typeof v2;
    if (t1 === "object") {
      if (t2 === "object" && !deepSameKeys(v1, v2)) {
        return false;
      }
    }
    if (t2 === "object") {
      if (t1 === "object" && !deepSameKeys(v1, v2)) {
        return false;
      }
    }
    return true;
  });
};
