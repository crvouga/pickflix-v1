import { Box, List, Typography } from "@material-ui/core";
import React from "react";
import { useSearchState } from "../redux/search";
import SearchHistoryListItem from "./SearchHistoryListItem";

export default () => {
  const { history, filter } = useSearchState();

  if (history.length === 0) {
    return (
      <Box marginX={4} paddingY={4}>
        <Typography align="center" color="textSecondary">
          No recent searches
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <List>
        {history
          .filter((result) => filter === undefined || result.type === filter)
          .map((result) => (
            <SearchHistoryListItem key={result.id} result={result} />
          ))}
      </List>
    </React.Fragment>
  );
};
