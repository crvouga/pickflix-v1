import { BackendAPI } from "../../backend-api";
import { User } from "./types";

export enum AuthMethod {
  password = "password",
}
export const getAuthMethods = async (email: string) => {
  const { data } = await BackendAPI.get<AuthMethod[]>("/api/auth/methods", {
    params: {
      email,
    },
  });
  return data;
};

/* 


*/

export const getUsers = async ({
  emailAddress,
  username,
}: {
  emailAddress?: string;
  username?: string;
}) => {
  const { data } = await BackendAPI.get<User[]>("/api/users", {
    params: { emailAddress, username },
  });
  return data;
};

/* 


*/

export const getCurrentUser = async () => {
  const { data } = await BackendAPI.get<User>("/api/users/current");
  return data;
};
