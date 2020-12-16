import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { BackendAPI } from "../backend-api";
import { Collection } from "../media/tmdb/types";
import MoviePosterScroll from "./components/MoviePosterScroll";
import ReadMoreTypography from "../common/components/ReadMoreTypography";

const queryKeys = {
  collection: (collectionId: string) => ["collection", collectionId],
};

const getCollection = async (collectionId: string) => {
  const { data } = await BackendAPI.get<Collection>(
    `/api/tmdb/collection/${collectionId}`
  );
  return data;
};

export default ({ collectionId }: { collectionId: string }) => {
  const query = useQuery(queryKeys.collection(collectionId), () =>
    getCollection(collectionId)
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const collection = query.data;

  const { name, overview, parts } = collection;

  return (
    <React.Fragment>
      <Box paddingX={2} paddingBottom={1}>
        <Typography variant="h6">{name}</Typography>
        <ReadMoreTypography color="textSecondary" variant="body2">
          {overview}
        </ReadMoreTypography>
      </Box>
      <MoviePosterScroll movies={parts} />
    </React.Fragment>
  );
};
