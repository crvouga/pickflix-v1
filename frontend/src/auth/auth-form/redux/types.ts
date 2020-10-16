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

export type Status = "loading" | "success" | "error" | null;

export interface AuthFormState {
  status: Status | null;
  step: Step.signIn;
  error: FirebaseError | null;
  values: Partial<FormValues>;
}

export const initialState: AuthFormState = {
  status: null,
  step: Step.signIn,
  error: null,
  values: {},
};
