import { v4, validate } from "uuid";
import { Opaque } from "../utils";

export type Id = Opaque<string, "UUID">;
export const makeId = () => v4() as Id;
export const isValidId = (id: any) => (validate(id) ? (id as Id) : false);
