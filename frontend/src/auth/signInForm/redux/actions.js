import { createAction } from "@reduxjs/toolkit";
import { namespace } from "./constants";

const action = (type) => createAction("[" + namespace + "] " + type);

export default {
  setStep: action("SET_STEP"),
  setValues: action("SET_VALUES"),
  setStatus: action("SET_STATUS"),
  setError: action("SET_ERROR"),
  //
  reset: action("RESET"),
  nextStep: action("NEXT_STEP"),
  register: action("REGISTER"),
  submit: action("SUBMIT"),
  submitSuccess: action("SUBMIT_SUCCESS"),
};
