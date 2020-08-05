import { createAction } from "@reduxjs/toolkit";

export default {
  signIn: createAction("auth/signIn"),
  signOut: createAction("auth/signOut"),
  setUser: createAction("auth/setUser"),
  getUser: createAction("auth/getUser"),
  deleteAccount: createAction("auth/deleteAccount"),
};
