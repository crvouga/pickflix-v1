import { User } from "../../users/models/make-user";

export type Events = {
  UserCreated: User;
};

export * from "./types";
