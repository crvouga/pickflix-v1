import React from "react";
import { useCurrentUser } from "../auth/useAuth";
import LoadingPage from "../common/page/LoadingPage";
import ProfilePageAuthenticated from "./ProfilePage.Authenticated";
import ProfilePageUnauthenticated from "./ProfilePage.Unauthenticated";

export default () => {
  const currentUser = useCurrentUser();

  if (currentUser === "loading") {
    return <LoadingPage />;
  }

  if (currentUser === null) {
    return <ProfilePageUnauthenticated />;
  }

  return <ProfilePageAuthenticated currentUser={currentUser} />;
};
