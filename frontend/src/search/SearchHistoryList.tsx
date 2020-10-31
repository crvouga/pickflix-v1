import { List, Typography, Box } from "@material-ui/core";
import React from "react";
import SearchHistoryListItem from "./SearchHistoryListItem";
import useSearchHistory from "./useSearchHistory";

export default () => {
  const searchHistory = useSearchHistory();

  if (searchHistory.history.length === 0) {
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
        {searchHistory.history.map((result) => (
          <SearchHistoryListItem key={result.id} result={result} />
        ))}
      </List>
    </React.Fragment>
  );
};
