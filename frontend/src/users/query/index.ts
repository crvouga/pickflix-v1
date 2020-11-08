import { BackendAPI } from "../../backend-api";

export type User = {
  type: "user";
  id: string;
  username: string;
  emailAddress: string;
  displayName: string;
};

export const queryKeys = {
  user: ({ username }: { username: string }) => ["users", username],
  currentUser: () => ["user"],
  users: (email: string) => ["users", email],
};

/* 


*/

export const getUser = async ({ username }: { username: string }) => {
  const { data } = await BackendAPI.get<User>(`/api/users/${username}`);
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
