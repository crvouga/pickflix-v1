import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";

const actions = {
  setStep: createAction("signIn/setStep"),
  setForm: createAction("signIn/setForm"),
  setMethods: createAction("signIn/setMethods"),
};

const Step = {
  signIn: "signIn",
  email: "email",
  emailTaken: "emailTaken",
  emailRegister: "emailRegister",
  emailPassword: "emailPassword",
};

const initialState = {
  step: Step.signIn,
  methods: [],
  form: {
    email: "crvouga@gmail.com",
  },
};

const reducer = createReducer(initialState, {
  [actions.setStep]: (state, action) => {
    state.step = action.payload;
  },
  [actions.setMethods]: (state, action) => {
    state.methods = action.payload;
  },
  [actions.setForm]: (state, action) => {
    state.form = R.mergeLeft(action.payload, state.form);
  },
});

const selectors = {
  step: (state) => state.signIn?.step,
  methods: (state) => state.signIn?.methods,
  form: (state) => state.signIn?.form,
};

export default {
  reducer,
  actions,
  selectors,
  Step,
};
