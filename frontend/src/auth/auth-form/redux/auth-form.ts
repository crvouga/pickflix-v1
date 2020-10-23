import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase";
import { AppState } from "../../../redux/types";

const name = "authForm";

/* 


*/

export type FormValues = {
  email: string;
  [key: string]: string;
};

export enum AuthFormStep {
  email = "EMAIL",
  emailTaken = "EMAIL_TAKEN",
  emailRegister = "EMAIL_REGISTER",
  emailPassword = "EMAIL_PASSWORD",
}

export enum SignInMethod {
  Google = "google.com",
  Password = "password",
}

export type Status = "loading" | "success" | "error" | null;

export interface AuthFormState {
  status: Status | null;
  step: AuthFormStep;
  error: FirebaseError | null;
  email: string | null;
}

export const initialState: AuthFormState = {
  status: null,
  step: AuthFormStep.email,
  error: null,
  email: null,
};

/* 


*/

const slice = (state: AppState) => state.authForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setStep: createAction<AuthFormStep>(`${name}/SET_STEP`),
  setStatus: createAction<Status>(`${name}/SET_STATUS`),
  setError: createAction<Error | undefined>(`${name}/SET_ERROR`),
  reset: createAction(`${name}/RESET`),
  setEmail: createAction<string | null>(`${name}/SET_EMAIL`),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setStatus.toString()]: (state, action) => {
    state.status = action.payload;
  },
  [actions.setStep.toString()]: (state, action) => {
    state.step = action.payload;
  },
  [actions.setError.toString()]: (state, action) => {
    state.error = action.payload;
  },
  [actions.setEmail.toString()]: (state, action) => {
    state.email = action.payload;
  },
  [actions.reset.toString()]: (state, action) => {
    return initialState;
  },
});

/* 


*/

export const authForm = {
  reducer,
  selectors,
  actions,
};
