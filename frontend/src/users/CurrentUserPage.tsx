import React from "react";
import { Redirect } from "react-router";
import LoadingPage from "../common/page/LoadingPage";
import SignInPage from "./SignInPage";
import useCurrentUser from "./useCurrentUser";

export default () => {
  const currentUser = useCurrentUser();

  if (currentUser === "loading") {
    return <LoadingPage />;
  }

  if (currentUser === null) {
    return <SignInPage />;
  }

  return <Redirect to={`/user/${currentUser.username}`} />;
};
