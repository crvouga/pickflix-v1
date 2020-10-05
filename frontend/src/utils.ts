import { Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const capitalize = (string: string) =>
  (string[0] || "").toUpperCase() +
  string.substring(0, string.length - 1).toLowerCase();

const gradientStep = (color: string, steps: number[]) =>
  steps.map((step) => fade(color, step)).join(", ");

export const makeFadeToBackgroundCss = (
  theme: Theme,
  steps: number[]
) => `linear-gradient(
    ${gradientStep(theme.palette.background.default, steps)}
  )`;
