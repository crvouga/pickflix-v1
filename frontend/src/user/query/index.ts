import { useQuery, useQueryCache } from "react-query";
import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
export * from "./hooks";

export type User = {
  type: "user";
  id: string;
  username: string;
  emailAddress: string;
  displayName: string;
};

export type UserAggergation = {
  user: User;
  reviewCount: number;
  listCount: number;
  autoListCount: number;
};

export const queryKeys = {
  user: ({ username }: { username: string }) => ["users", username],
  currentUser: () => ["current-user"],
  users: (email: string) => ["users", email],
};

/* 


*/

type GetUsersParams = {
  id?: string;
  emailAddress?: string;
  username?: string;
  page?: number;
};

export const getUsers = async (params: GetUsersParams) => {
  const { data } = await BackendAPI.get<Paginated<UserAggergation>>(
    "/api/users",
    {
      params,
    }
  );
  return data;
};

const makeGetUsersQueryKey = (params: GetUsersParams) => ["users", params];

export const useQueryUsers = (params: GetUsersParams) => {
  return useQuery(makeGetUsersQueryKey(params), () => getUsers(params));
};

/* 


*/

export const getCurrentUser = async () => {
  const { data } = await BackendAPI.get<UserAggergation | null>("/api/auth");
  return data;
};

/*


*/

export type PatchUserParams = {
  emailAddress?: string;
  displayName?: string;
  username?: string;
};

export const patchUser = async (params: PatchUserParams) => {
  const { data } = await BackendAPI.patch<User>("/api/users", params);
  return data;
};

/* 


*/

export const useEditUserMutation = () => {
  const queryCache = useQueryCache();
  return async ({
    userId,
    ...params
  }: PatchUserParams & { userId: string }) => {
    try {
      await patchUser(params);
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries(
        (query) =>
          query.queryKey.includes("current-user") ||
          query.queryKey.includes(userId)
      );
    }
  };
};
