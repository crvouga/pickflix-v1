import { User } from "firebase";

export type Status = "loading" | "success" | "error";
export type AuthError =
  | {
      [k: string]: any;
    }
  | undefined;

export interface AuthState {
  status: Status;
  user: User | false;
  error: AuthError;
}
