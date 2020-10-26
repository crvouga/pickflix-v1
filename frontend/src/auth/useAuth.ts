import { useQuery, useQueryCache } from "react-query";
import { deleteAuth, User, getCurrentUser, postAuth, queryKeys } from "./query";
import { useHistory } from "react-router";
import useSnackbar from "../snackbar/useSnackbar";

export const useQueryUser = () => {
  return useQuery(queryKeys.user(), () => getCurrentUser(), {
    retry: 0,
    staleTime: Infinity,
  });
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
  const snackbar = useSnackbar();
  const history = useHistory();

  const signOut = async () => {
    await deleteAuth();
    history.push("/");
    queryCache.removeQueries(queryKeys.user());
    queryCache.invalidateQueries((query) => {
      return query.queryKey.includes("user");
    });
    snackbar.display({
      message: "You are now signed out",
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
