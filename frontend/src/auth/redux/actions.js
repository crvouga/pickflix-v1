import { createAction } from "@reduxjs/toolkit";

export default {
  setUser: createAction("auth/setUser"),
  setFormStep: createAction("auth/setFormStep"),
  setFormValues: createAction("auth/setFormValues"),
  setSignInMethods: createAction("auth/setSignInMethods"),
  setStatus: createAction("auth/setStatus"),
  setFormErrors: createAction("auth/setFormErrors"),
  //
  nextFormStep: createAction("auth/nextFormStep"),
  signIn: createAction("auth/signIn"),
  signInSuccess: createAction("auth/signInSuccess"),
  signInError: createAction("auth/signInError"),
  register: createAction("auth/register"),
};
