import { Box, List, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { InfiniteScrollBottom } from "../../common/infinite-scroll";
import { useSearchState } from "../redux/search";
import SearchResultListItem from "./SearchResultListItem";
import { useQuerySearchResults } from "../query";

export default () => {
  const { text, filter } = useSearchState();

  const query = useQuerySearchResults({
    text,
    filter,
  });

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return (
      <List>
        {[...Array(5)].map((_, index) => (
          <ListItemSkeleton key={index} />
        ))}
      </List>
    );
  }

  const results = query.data.flatMap((page) => page.results);

  if (results.length === 0) {
    return (
      <Box m={6}>
        <Typography
          color="textSecondary"
          align="center"
          style={{ wordBreak: "break-word" }}
        >
          {`Couldn't find anything for "${text}"`}
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <List>
        {results.map((result, index) => (
          <Box key={result.id || index}>
            <SearchResultListItem result={result} />
          </Box>
        ))}
      </List>
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
