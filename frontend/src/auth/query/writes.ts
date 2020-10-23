import backendAPI from "../../backendAPI";

export type PostUserWithPasswordParams = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  type: "user";
  id: string;
  username: string;
  email: string;
};

export const postUserWithPassword = async (
  params: PostUserWithPasswordParams
) => {
  const { data } = await backendAPI.post<User>("/api/users/password", {
    email: params.email,
    username: params.username,
    password: params.password,
  });
  return data;
};
