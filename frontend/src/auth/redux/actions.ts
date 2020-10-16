import { createAction } from "@reduxjs/toolkit";
import { User } from "firebase";
import { Status, AuthError, AuthStatus } from "./types";

const name = "auth";

export const setUser = createAction<User | undefined>(name + "/SET_USER");
export const setStatus = createAction<Status>(name + "/SET_STATUS");
export const setError = createAction<AuthError | undefined>(
  name + "/SET_ERROR"
);
export const setAuthStatus = createAction<AuthStatus>(
  name + "/SET_AUTH_STATUS"
);

export const signInSuccess = createAction(name + "/SIGN_IN_SUCCESS");
export const signInError = createAction(name + "/SIGN_IN_ERROR");
export const signIn = createAction(name + "/SIGN_IN");
export const signOut = createAction(name + "/SIGN_OUT");
export const deleteUser = createAction(name + "/DELETE_USER");

export const signedIn = createAction(name + "/SIGNED_IN");
export const signedOut = createAction(name + "/SIGNED_OUT");
