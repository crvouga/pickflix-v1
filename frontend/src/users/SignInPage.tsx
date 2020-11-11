import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import SignInButton from "../auth/SignInButton";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";

export default () => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Container maxWidth="md">
        <Box
          width="100%"
          height="480px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box paddingBottom={2}>
              <Typography variant="h6" align="center">
                You are not signed in.
              </Typography>
              <Typography color="textSecondary" align="center">
                Signing in lets you create lists and write reviews.
              </Typography>
            </Box>
            <SignInButton />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
