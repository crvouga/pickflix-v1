import { Box, Zoom } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";

export default () => {
  return (
    <Box
      width="100vw"
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Zoom in>
        <div>
          <PickflixLogo marginBottom={4} scale={1.5} />
        </div>
      </Zoom>
    </Box>
  );
};
