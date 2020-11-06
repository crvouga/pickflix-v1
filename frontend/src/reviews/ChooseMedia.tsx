import { AppBar, Box, Button, Hidden, List } from "@material-ui/core";
import React, { useState } from "react";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import LoadingBox from "../common/components/LoadingBox";
import useInfiniteQueryPagination from "../common/hooks/useInfiniteQueryPagination";
import usePageHistory from "../home/page-history/usePageHistory";
import MovieListItem from "../movie/components/MovieListItem";
import SearchTextField from "../search/SearchTextField";
import { getSearchMovies, queryKeys } from "../tmdb/query";
import { Movie, TmdbMedia } from "../tmdb/types";

const SearchResults = ({
  text,
  onClickResult,
}: {
  text: string;
  onClickResult: (result: Movie) => void;
}) => {
  const {
    fetchMoreRef,
    data,
    error,
    canFetchMore,
  } = useInfiniteQueryPagination(
    queryKeys.searchMovies({ query: text }),
    ({ lastPage }) =>
      text.length > 0
        ? getSearchMovies({ query: text, page: lastPage })
        : Promise.resolve({ results: [], page: 1, totalPages: 1 })
  );

  const pageHistory = usePageHistory();

  if (error) {
    return null;
  }

  if (!data) {
    return (
      <List>
        {[1, 2, 3, 4, 5].map((n) => (
          <ListItemSkeleton key={n} />
        ))}
      </List>
    );
  }

  if (data[0] && data[0].results.length === 0) {
    return (
      <List>
        {pageHistory.entities.map((entity) =>
          entity.mediaType === "movie" ? (
            <MovieListItem
              key={entity.id}
              movie={entity}
              onClick={() => onClickResult(entity)}
            />
          ) : null
        )}
      </List>
    );
  }

  return (
    <List>
      {data.map((response) =>
        response.results.map((result) => (
          <MovieListItem
            key={result.id}
            movie={result}
            onClick={() => onClickResult(result)}
          />
        ))
      )}
      {canFetchMore && <LoadingBox m={6} />}
      <div ref={fetchMoreRef} />
    </List>
  );
};

export default ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (_: TmdbMedia) => void;
}) => {
  const [text, setText] = useState("");
  const handleClickResult = (result: Movie) => {
    onSubmit({
      tmdbMediaType: "movie",
      tmdbMediaId: result.id,
    });
  };
  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Box display="flex" p={1}>
          <Box flex={1}>
            <SearchTextField
              onChange={setText}
              placeholder="What movie do you want to review?"
            />
          </Box>
          <Hidden smUp>
            <Button size="large" onClick={onCancel}>
              Cancel
            </Button>
          </Hidden>
        </Box>
      </AppBar>
      <SearchResults text={text} onClickResult={handleClickResult} />
    </React.Fragment>
  );
};
