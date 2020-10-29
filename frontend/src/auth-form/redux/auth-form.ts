import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase";
import { AppState } from "../../redux/types";
import { User } from "../../auth/query";

const name = "authForm";

/* 


*/

export type FormValues = {
  email: string;
  [key: string]: string;
};

export enum AuthFormStep {
  credential = "CREDENTIAL",
  signUp = "SIGN_UP",
  signIn = "SIGN_IN",
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
  user: User | null;
}

export const initialState: AuthFormState = {
  status: null,
  step: AuthFormStep.credential,
  error: null,
  email: null,
  user: null,
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
  setUser: createAction<User>(`${name}/SET_USER`),
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
  [actions.setUser.toString()]: (state, action) => {
    state.user = action.payload;
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
