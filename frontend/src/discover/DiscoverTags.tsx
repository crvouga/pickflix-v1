import { Box } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../common/components/HorizontalScroll";

export default () => {
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row" bgcolor="background.default">
        <HorizontalScroll p={2}></HorizontalScroll>
      </Box>
    </React.Fragment>
  );
};
