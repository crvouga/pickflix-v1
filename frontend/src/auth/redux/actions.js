import { createAction } from "@reduxjs/toolkit";

export default {
  setUser: createAction("[auth] SET_USER"),
  setStatus: createAction("[auth] SET_STATUS"),
  setError: createAction("[auth] SET_ERROR"),
  //
  signInSuccess: createAction("[auth] SIGN_IN_SUCCESS"),
  signInError: createAction("[auth] SIGN_IN_ERROR"),
  signIn: createAction("[auth] SIGN_IN"),
  signOut: createAction("[auth] SIGN_OUT"),
  deleteUser: createAction("[auth] DELETE_USER"),
};
