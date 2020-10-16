import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";

const slice = (state: AppState) => state.auth;

export const user = createSelector([slice], (slice) => slice.user);
export const status = createSelector([slice], (slice) => slice.status);
export const error = createSelector([slice], (slice) => slice.error);
export const authStatus = createSelector([slice], (slice) => slice.authStatus);
export const isAuthenticated = createSelector(
  [authStatus],
  (authStatus) => authStatus === "signedIn"
);
