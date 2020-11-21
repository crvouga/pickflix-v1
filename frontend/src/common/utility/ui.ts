import { DialogProps, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const closeDialog = (props: DialogProps) => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

const gradientStep = (color: string, steps: number[]) =>
  steps.map((step) => fade(color, step)).join(", ");

export const makeFadeToBackgroundCss = (
  theme: Theme,
  steps: number[]
) => `linear-gradient(
    ${gradientStep(theme.palette.background.default, steps)}
  )`;

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
