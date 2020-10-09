import { User } from "firebase";

export type Status = "loading" | "success" | "error";

export type AuthStatus = "signedIn" | "signedOut" | "loading";

export type AuthError =
  | {
      [k: string]: any;
    }
  | undefined;

export interface AuthState {
  status: Status;
  authStatus: AuthStatus;
  user: User | undefined;
  error: AuthError;
}

export const initialState: AuthState = {
  status: "loading",
  authStatus: "loading",
  user: undefined,
  error: undefined,
};
