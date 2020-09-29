import { createAction } from "@reduxjs/toolkit";

import { FormValues, Status, Step, SignInMethod } from "./types";

const namespace = `[signInForm]`;

export const setStep = createAction<Step>(`${namespace} SET_STEP`);
export const setValues = createAction<FormValues>(`${namespace} SET_VALUES`);
export const setStatus = createAction<Status>(`${namespace} SET_STATUS`);
export const setError = createAction<Error | undefined>(
  `${namespace} SET_ERROR`
);

export const reset = createAction(`${namespace} RESET`);
export const nextStep = createAction<FormValues>(`${namespace} NEXT_STEP`);
export const register = createAction<FormValues>(`${namespace} REGISTER`);
export const submit = createAction<
  { [key: string]: any } & {
    signInMethod: SignInMethod;
  }
>(`${namespace} SUBMIT`);

export const submitSuccess = createAction<firebase.auth.UserCredential>(
  `${namespace} SUBMIT_SUCCESS`
);
