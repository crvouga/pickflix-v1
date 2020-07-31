import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import constants from "./constants";
const { FormStep } = constants;

export default createReducer(
  {
    user: null,
    signInMethods: [],
    status: null,
    formStep: FormStep.signIn,
    formErrors: {},
    formValues: {
      email: "crvouga@gmail.com",
    },
  },
  {
    [actions.setUser]: (state, action) => {
      state.user = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setSignInMethods]: (state, action) => {
      state.signInMethods = action.payload;
    },
    [actions.setFormStep]: (state, action) => {
      state.formStep = action.payload;
    },
    [actions.setFormErrors]: (state, action) => {
      state.formErrors = action.payload;
    },
    [actions.setFormValues]: (state, action) => {
      state.formValues = action.payload;
    },
  }
);
