import { FirebaseError } from "firebase";

export type FormValues = {
  email: string;
  [key: string]: string;
};

export enum Step {
  signIn = "SIGN_IN",
  email = "EMAIL",
  emailTaken = "EMAIL_TAKEN",
  emailRegister = "EMAIL_REGISTER",
  emailPassword = "EMAIL_PASSWORD",
}

export enum SignInMethod {
  Google = "google.com",
  Password = "password",
}

export type Status = "loading" | "success" | "error" | undefined;

export interface SignInFormState {
  status: Status;
  step: Step.signIn;
  error: FirebaseError | undefined;
  values: FormValues;
}
export const initialState = {
  status: null,
  step: Step.signIn,
  error: null,
  values: {},
};
