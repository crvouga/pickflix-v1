import React from "react";
import { Redirect } from "react-router";
import SignInPage from "./SignInPage";
import { useQueryCurrentUser } from "./useCurrentUser";
import LoadingPage from "../common/page/LoadingPage";

export default () => {
  const query = useQueryCurrentUser();

  if (query.error || query.data === null) {
    return <SignInPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  return <Redirect to={`/user/${query.data.user.username}`} />;
};
