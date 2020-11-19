import { Box } from "@material-ui/core";
import React from "react";
import ListCardSkeleton from "./ListCardSkeleton";

export default ({ count }: { count: number }) => {
  return (
    <React.Fragment>
      {[...Array(count)].map((_, index) => (
        <Box key={index} width="100%" height="100px" paddingY={1}>
          <ListCardSkeleton />
        </Box>
      ))}
    </React.Fragment>
  );
};
