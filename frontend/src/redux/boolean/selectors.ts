import { AppState } from "../types";

export const isTrue = (name: string) => (state: AppState) =>
  state.boolean?.[name] || false;
