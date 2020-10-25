import React from "react";
import AccountPageAuthenticated from "./AccountPage.Authenticated";
import AccountPageLoading from "./AccountPage.Loading";
import AccountPageUnauthenticated from "./AccountPage.Unauthenticated";
import { useAuth } from "./useAuth";

export default () => {
  const { currentUser } = useAuth();

  if (currentUser === "loading") {
    return <AccountPageLoading />;
  }

  if (currentUser === null) {
    return <AccountPageUnauthenticated />;
  }

  return <AccountPageAuthenticated currentUser={currentUser} />;
};
