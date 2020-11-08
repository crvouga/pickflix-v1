import { useQuery, useQueryCache } from "react-query";
import { useHistory } from "react-router";
import useSnackbar from "../snackbar/useSnackbar";
import {
  deleteAuth,
  postAuth,
  PostAuthParams,
  postUserWithPassword,
  PostUserWithPasswordParams,
} from "./query";

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
    try {
      const user = await postAuth(params);
      queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
      snackbar.display({
        message: `Signed in as ${user.username}`,
      });
      history.push("/");
    } catch (error) {
      snackbar.display({
        message: "Something went wrong",
      });
      throw error;
    }
  };

  const signOut = async () => {
    await deleteAuth();
    history.push("/");

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
