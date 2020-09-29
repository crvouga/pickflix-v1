declare module "units-css" {
  export function convert(
    unit: "px",
    cssValue: string,
    node: HTMLElement
  ): number;
}
