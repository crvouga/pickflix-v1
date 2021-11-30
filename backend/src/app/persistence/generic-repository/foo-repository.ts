import { makeId } from "../../../common/id";

type Color = "red" | "blue" | "green" | "yellow";

export const castColor = (color: any): Color => {
  if (
    typeof color === "string" &&
    (color === "red" ||
      color === "blue" ||
      color === "green" ||
      color === "yellow")
  ) {
    return color;
  }
  throw new Error("failed to cast color");
};

export type Id = string;

export type Foo = {
  id: Id;
  name: string;
  favoriteColor: Color;
  createdAt: number;
};

export const makeFooArbitrary = (overrides?: Partial<Foo>): Foo => {
  return {
    id: makeId(),
    name: "bar baz",
    favoriteColor: "yellow",
    createdAt: Date.now(),
    ...overrides,
  };
};
