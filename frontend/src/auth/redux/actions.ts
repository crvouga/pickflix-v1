import { createAction } from "@reduxjs/toolkit";
import { User } from "firebase";
import { Status, AuthError, AuthStatus } from "./types";
export const setUser = createAction<User | false>("[auth] SET_USER");
export const setStatus = createAction<Status>("[auth] SET_STATUS");
export const setError = createAction<AuthError | undefined>("[auth] SET_ERROR");
export const setAuthStatus = createAction<AuthStatus>("[auth] SET_AUTH_STATUS");

export const signInSuccess = createAction("[auth] SIGN_IN_SUCCESS");
export const signInError = createAction("[auth] SIGN_IN_ERROR");
export const signIn = createAction("[auth] SIGN_IN");
export const signOut = createAction("[auth] SIGN_OUT");
export const deleteUser = createAction("[auth] DELETE_USER");
