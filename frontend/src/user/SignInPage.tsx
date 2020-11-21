import { Box, Container } from "@material-ui/core";
import React from "react";
import SignInCallToAction from "./auth/SignInCallToAction";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";

export default () => {
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
