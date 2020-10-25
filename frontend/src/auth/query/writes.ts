import { BackendAPI } from "../../backend-api";
import { User } from "./types";

export type PostUserWithPasswordParams = {
  email: string;
  username: string;
  displayName: string;
  password: string;
};

export const postUserWithPassword = async (
  params: PostUserWithPasswordParams
) => {
  const { data } = await BackendAPI.post<User>("/api/users/password", params);
  return data;
};

/* 


*/

export type PostAuthParams = {
  email: string;
  password: string;
};

export const postAuth = async (params: PostAuthParams) => {
  const { data } = await BackendAPI.post<User>("/api/auth", params);
  return data;
};

/* 


*/

export const deleteAuth = async () => {
  const { data } = await BackendAPI.delete<{}>("/api/auth");
  return data;
};
