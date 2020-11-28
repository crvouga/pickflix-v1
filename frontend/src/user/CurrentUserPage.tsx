import { Box, Container } from "@material-ui/core";
import React from "react";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import LoadingPage from "../common/page/LoadingPage";
import SignInCallToAction from "./auth/SignInCallToAction";
import WithAuthentication from "./auth/WithAuthentication";
import { UserPage } from "./UserPage";

export const makeCurrentUserPageRoute = () => "/current-user";

const SignInPage = () => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Container maxWidth="md">
        <Box
          width="100%"
          height="100%"
          marginTop={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SignInCallToAction />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default () => {
  return (
    <WithAuthentication
      renderLoading={() => <LoadingPage />}
      renderAuthenticated={(currentUser) => <UserPage user={currentUser} />}
      renderUnathenticated={() => <SignInPage />}
    />
  );
};
