import { Box, Typography } from "@material-ui/core";
import React from "react";
import ExpandHeight from "../common/components/ExpandHeight";
import Markdown from "../common/components/Markdown";
import useBoolean from "../common/hooks/useBoolean";

export default ({ details }) => {
  const isBioExpanded = useBoolean(false);

  if (!details.biography) {
    return null;
  }
  return (
    <React.Fragment>
      <Box
        paddingX={2}
        paddingTop={1}
        component={Typography}
        style={{ fontWeight: "bold" }}
      >
        Biography
      </Box>
      <Box
        paddingX={2}
        paddingBottom={1}
        textAlign="left"
        display="flex"
        flexDirection="column"
      >
        <ExpandHeight
          in={isBioExpanded.value}
          collapsedHeight="7.5em"
          onClick={isBioExpanded.toggle}
        >
          <Markdown>{details.biography}</Markdown>
        </ExpandHeight>
      </Box>
    </React.Fragment>
  );
};
