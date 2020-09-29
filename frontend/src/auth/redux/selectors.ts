import { AppState } from "../../redux/types";

export const user = (state: AppState) => state.auth?.user;
export const status = (state: AppState) => state.auth?.status;
export const error = (state: AppState) => state.auth?.error;
export const isAuthenticated = (state: AppState) => Boolean(user(state));
