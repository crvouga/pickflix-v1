import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import PickflixLogo from "../common/PickflixLogo";
import AuthWizardStep from "./AuthWizardStep";

export default () => {
  const history = useHistory();
  return (
    <Box width="100%" component={Paper}>
      <Box paddingTop={4} display="flex" justifyContent="center">
        <PickflixLogo
          scale={1.5}
          onClick={() => {
            history.push("/");
          }}
        />
      </Box>
      <Box p={4}>
        <AuthWizardStep />
      </Box>
    </Box>
  );
};
