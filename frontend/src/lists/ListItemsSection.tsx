import { Box, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import MoviePosterGrid from "../movie/components/MoviePosterGrid";
import { getListItems, queryKeys } from "./query";
import { useQuery } from "react-query";

type Props = {
  listId: string;
};

export default ({ listId }: Props) => {
  const query = useQuery(queryKeys.listItems({ listId }), () =>
    getListItems({ listId })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const listItems = query.data;

  if (listItems.results.length === 0) {
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
    <MoviePosterGrid
      movies={listItems.results.map((listItem) => listItem.tmdbData)}
    />
  );
};
