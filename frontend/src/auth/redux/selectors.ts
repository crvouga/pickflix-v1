import { AppState } from "../../redux/types";

export const user = (state: AppState) => state.auth?.user;

export const status = (state: AppState) => state.auth?.status;

export const error = (state: AppState) => state.auth?.error;

export const authStatus = (state: AppState) => state.auth.authStatus;

export const isAuthenticated = (state: AppState) =>
  authStatus(state) === "signedIn";
