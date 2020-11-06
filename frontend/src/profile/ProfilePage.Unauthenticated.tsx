import React from "react";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import { Box, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  const handleClickSignIn = () => {
    history.push("/auth");
  };

  return (
    <React.Fragment>
      <ResponsiveNavigation />

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
          <Box color="text.primary" fontWeight="bold">
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickSignIn}
              size="large"
              style={{ color: "inherit", fontWeight: "inherit" }}
              fullWidth
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
