import { useQuery, useQueryCache } from "react-query";
import { useHistory } from "react-router";
import useSnackbar from "../snackbar/useSnackbar";
import {
  deleteAuth,
  getCurrentUser,
  postAuth,
  PostAuthParams,
  postUserWithPassword,
  PostUserWithPasswordParams,
  queryKeys,
  User,
} from "./query";

export const useCurrentUser = (): User | "loading" | null => {
  const query = useQuery(queryKeys.user(), () => getCurrentUser(), {
    retry: 0,
  });

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
  const history = useHistory();
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();

  const signUp = async (params: PostUserWithPasswordParams) => {
    const user = await postUserWithPassword(params);
    queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
    snackbar.display({
      message: `Signed in as ${user.username}`,
    });
    history.push("/");
  };

  const signIn = async (params: PostAuthParams) => {
    const user = await postAuth(params);
    queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
    snackbar.display({
      message: `Signed in as ${user.username}`,
    });
    history.push("/");
  };

  const signOut = async () => {
    await deleteAuth();
    history.push("/");
    queryCache.removeQueries(queryKeys.user());
    queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
    snackbar.display({
      message: "You are now signed out",
    });
  };

  return {
    signUp,
    signIn,
    signOut,
  };
};
