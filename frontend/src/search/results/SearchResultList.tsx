import { Box, List, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import LoadingBox from "../../common/components/LoadingBox";
import { useSearchState } from "../redux/search";
import SearchResultListItem from "./SearchResultListItem";
import useQuerySearchResults from "./useQuerySearchResults";

export default () => {
  const { text, filter } = useSearchState();

  const { fetchMoreRef, data, error, canFetchMore } = useQuerySearchResults({
    text,
    filter,
  });

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return (
      <List>
        {[...Array(5)].map((n) => (
          <ListItemSkeleton key={n} />
        ))}
      </List>
    );
  }

  const results = data.flatMap((page) => page.results);

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
          <SearchResultListItem key={index} result={result} />
        ))}
      </List>
      {canFetchMore && <LoadingBox m={4} />}
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
