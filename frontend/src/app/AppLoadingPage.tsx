import { Box } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";

export default () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        marginBottom={6}
      >
        <PickflixLogo marginBottom={4} scale={1.5} />
      </Box>
    </Box>
  );
};
