import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import { Step } from "./constants";
import * as R from "ramda";

const initialState = {
  status: null,
  step: Step.signIn,
  error: null,
  values: {},
};

const setter = R.curry((key, state, action) =>
  R.assoc(key, action.payload, state)
);

const reducers = {
  [actions.setStatus]: setter("status"),
  [actions.setStep]: setter("step"),
  [actions.setError]: setter("error"),
  [actions.setValues]: setter("values"),
  [actions.reset]: (state, action) => {
    return initialState;
  },
};

export default createReducer(initialState, reducers);
