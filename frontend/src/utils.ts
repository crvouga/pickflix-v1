import axios from "axios";
import { Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

/* 

*/
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
