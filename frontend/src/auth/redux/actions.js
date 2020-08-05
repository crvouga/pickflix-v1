import { createAction } from "@reduxjs/toolkit";

export default {
  setUser: createAction("auth/setUser"),
  setStatus: createAction("auth/setStatus"),
  setError: createAction("auth/setError"),
  //
  signIn: createAction("auth/signIn"),
  signOut: createAction("auth/signOut"),
  getUser: createAction("auth/getUser"),
  deleteAccount: createAction("auth/deleteAccount"),
};
