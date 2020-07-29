import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import search from "./redux";

export default () => {
  const text = useSelector(search.selectors.text);
  const totalResults = useSelector(search.selectors.totalResults);
  const currentPage = useSelector(search.selectors.currentPage);
  const status = useSelector(search.selectors.status);

  const subtitle =
    status === "loading"
      ? "searching..."
      : text === ""
      ? ""
      : totalResults === 0
      ? `No results for "${text}"`
      : `Showing results for "${text}"`;

  return (
    <Box paddingX={1}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {subtitle}
      </Typography>
    </Box>
  );
};
