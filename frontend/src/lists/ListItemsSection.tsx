import { Box, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import useInfiniteQueryPagination from "../common/hooks/useInfiniteQueryPagination";
import MoviePosterGrid from "../movie/components/MoviePosterGrid";
import { getListItems, queryKeys } from "./query";

type Props = {
  listId: string;
};
const ensureArray = <T,>(x: T | T[]) => (Array.isArray(x) ? x : [x]);

export default ({ listId }: Props) => {
  const {
    fetchMoreRef,
    ...query
  } = useInfiniteQueryPagination(
    queryKeys.listItems({ listId }),
    ({ lastPage }) => getListItems({ listId, page: lastPage })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox m={6} />;
  }

  const listItems = ensureArray(query.data).flatMap((_) => _.results);

  if (listItems.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="200px"
      >
        <Typography align="center" color="textSecondary" variant="h6">
          There's nothing here
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <MoviePosterGrid
        movies={listItems.map((listItem) => listItem.tmdbData)}
      />

      {query.canFetchMore && <LoadingBox m={6} />}
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
