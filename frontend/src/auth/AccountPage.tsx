import React from "react";
import LoadingBox from "../common/components/LoadingBox";
import AccountPageAuthenticated from "./AccountPage.Authenticated";
import AccountPageNavBar from "./AccountPage.NavBar";
import AuthWizard from "../auth-form/AuthWizard";
import { useAuth, useCurrentUser } from "./useAuth";

export default () => {
  const currentUser = useCurrentUser();

  if (currentUser === "loading") {
    return (
      <React.Fragment>
        <AccountPageNavBar />
        <LoadingBox />
      </React.Fragment>
    );
  }

  if (currentUser === null) {
    return (
      <React.Fragment>
        <AccountPageNavBar />
        <AuthWizard />
      </React.Fragment>
    );
  }

  return <AccountPageAuthenticated currentUser={currentUser} />;
};
