import { createAction } from "@reduxjs/toolkit";
import { namespace } from "./constants";
const action = (type) => createAction(namespace + "/" + type);

export default {
  setStep: action("setStep"),
  setValues: action("setValues"),
  setStatus: action("setStatus"),
  setError: action("setError"),
  //
  reset: action("reset"),
  nextStep: action("nextStep"),
  register: action("register"),
  signIn: action("signIn"),
  signInSuccess: action("signInSuccess"),
  signInError: action("signInError"),
};
