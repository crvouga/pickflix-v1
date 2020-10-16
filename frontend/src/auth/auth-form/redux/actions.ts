import { createAction } from "@reduxjs/toolkit";

import { FormValues, Status, Step, SignInMethod } from "./types";

const name = "authForm";

export const setStep = createAction<Step>(`${name}/SET_STEP`);
export const setValues = createAction<FormValues>(`${name}/SET_VALUES`);
export const setStatus = createAction<Status>(`${name}/SET_STATUS`);
export const setError = createAction<Error | undefined>(`${name}/SET_ERROR`);

export const reset = createAction(`${name}/RESET`);
export const nextStep = createAction<FormValues>(`${name}/NEXT_STEP`);
export const register = createAction<FormValues>(`${name}/REGISTER`);
export const submit = createAction<
  { [key: string]: any } & {
    signInMethod: SignInMethod;
  }
>(`${name}/SUBMIT`);

export const submitSuccess = createAction<firebase.auth.UserCredential>(
  `${name}/SUBMIT_SUCCESS`
);
