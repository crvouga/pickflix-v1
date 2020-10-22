import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ReviewAggergation } from "./query/types";

type Props = ReviewAggergation;

export default (props: Props) => {
  return (
    <Box p={2}>
      <Typography variant="body1">{props.review.content}</Typography>
    </Box>
  );
};
