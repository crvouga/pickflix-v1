import { AppState } from "../types";

export const entities = (state: AppState) =>
  state.recentlyViewed.entities || [];
