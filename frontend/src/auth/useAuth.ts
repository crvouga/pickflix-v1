import { useQuery, useQueryCache } from "react-query";
import { deleteAuth, User, getCurrentUser, postAuth, queryKeys } from "./query";
import { useHistory } from "react-router";

export const useQueryUser = () => {
  return useQuery(queryKeys.user(), () => getCurrentUser(), { retry: 1 });
};

export const useCurrentUser = (): User | "loading" | null => {
  const query = useQueryUser();

  switch (query.status) {
    case "loading":
      return "loading";

    case "success":
      const currentUser = query.data;
      if (currentUser) {
        return currentUser;
      } else {
        return null;
      }

    default:
      return null;
  }
};

export const useAuth = () => {
  const currentUser = useCurrentUser();
  const queryCache = useQueryCache();
  const history = useHistory();

  const signOut = async () => {
    await deleteAuth();
    history.push("/");
    queryCache.invalidateQueries((query) => {
      return query.queryKey.includes("user");
    });
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await postAuth({
      email,
      password,
    });
  };

  const deleteCurrentUser = async () => {};

  return {
    currentUser,
    signOut,
    signIn,
    deleteCurrentUser,
  };
};
