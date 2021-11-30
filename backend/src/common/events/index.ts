import { User } from "../../users/models/make-user";

export type Events = {
  UserCreated: User;
  UserSignedIn: User;
};

export * from "./types";
