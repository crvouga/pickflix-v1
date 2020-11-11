import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  const handleClickSignIn = () => {
    history.push("/auth");
  };

  return (
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
  );
};
