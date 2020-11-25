import * as EmailValidator from "email-validator";
import equals from "fast-deep-equal";
import { QueryConfig, useQuery, useQueryCache } from "react-query";
import { BackendAPI } from "../../backend-api";
import { makeEmptyPaginatedResponse, Paginated } from "../../common/types";
import { makeGetListsQueryKey } from "../../list/query";

//copyed from server

export const MAX_USERNAME_LENGTH = 16;
export const MIN_USERNAME_LENGTH = 2;

export const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
export const isValidUsername = (username: string) =>
  USERNAME_REGEXP.test(username) &&
  MIN_USERNAME_LENGTH <= username.length &&
  username.length <= MAX_USERNAME_LENGTH;

export const MAX_DISPLAY_NAME_LENGTH = 30;
export const isValidDisplayName = (displayName: string) =>
  displayName.length <= MAX_DISPLAY_NAME_LENGTH;

export const isValidEmailAddress = (emailAddress: string) =>
  EmailValidator.validate(emailAddress);

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

/* 


*/

export const makeGetCurrentUserQueryKey = () => ["current-user"];

export const useQueryCurrentUser = () => {
  return useQuery(makeGetCurrentUserQueryKey(), () => getCurrentUser());
};

/* 


*/

type GetUsersParams = {
  id?: string;
  emailAddress?: string;
  username?: string;
  page?: number;
};

type GetUsersData = Paginated<UserAggergation>;
const EMPTY_GET_USERS_DATA = makeEmptyPaginatedResponse<UserAggergation>();
export const getUsers = async (params: GetUsersParams) => {
  const { emailAddress, username } = params;

  if (
    (emailAddress && !isValidEmailAddress(emailAddress)) ||
    (username && !isValidUsername(username))
  ) {
    return EMPTY_GET_USERS_DATA;
  }

  const { data } = await BackendAPI.get<GetUsersData>("/api/users", {
    params,
  });
  return data;
};

const makeGetUsersQueryKey = (params: GetUsersParams) => ["users", params];

export const useQueryUsers = (
  params: GetUsersParams,
  config?: QueryConfig<GetUsersData>
) => {
  return useQuery(makeGetUsersQueryKey(params), () => getUsers(params), config);
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
          equals(query.queryKey, makeGetCurrentUserQueryKey()) ||
          equals(query.queryKey, makeGetUsersQueryKey({ id: userId })) ||
          equals(query.queryKey, makeGetListsQueryKey({ ownerId: userId }))
      );
    }
  };
};
