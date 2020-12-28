import { User } from "../../users/models/make-user";

export type Events = {
  UserCreated: User;
  UserVerified: User;
};

export * from "./types";
