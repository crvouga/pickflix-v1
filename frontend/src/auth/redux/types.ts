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
