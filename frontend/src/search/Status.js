import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import search from "./redux";

export default () => {
  const input = useSelector(search.selectors.input);
  const totalResults = useSelector(search.selectors.totalResults);
  const currentPage = useSelector(search.selectors.currentPage);
  const status = useSelector(search.selectors.status);

  const subtitle =
    status === "loading"
      ? "searching..."
      : input.text === ""
      ? ""
      : totalResults === 0
      ? `No results for "${input.text}"`
      : `Showing results for "${input.text}"`;

  return (
    <Box paddingX={1}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {subtitle}
      </Typography>
    </Box>
  );
};
