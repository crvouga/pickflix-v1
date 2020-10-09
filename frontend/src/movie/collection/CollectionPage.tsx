import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import backendAPI from "../../backendAPI";
import ReadMore from "../../common/components/ReadMore";
import NavigationBarFadeIn from "../../common/NavigationBarFadeIn";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import { Collection } from "../../tmdb/types";
import MovieCard from "../components/MovieCard";
import BackdropHeader from "./BackdropHeader";
import { collectionToBackdropPath } from "./utils";

export default () => {
  const { collectionId } = useParams<{ collectionId: string }>();

  const query = useQuery<Collection, string>(
    ["collection", collectionId].join(""),
    () =>
      backendAPI
        .get(`/api/tmdb/collection/${collectionId}`)
        .then((res) => res.data),
    {}
  );

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const collection = query.data;
  const { name, overview, parts } = collection;

  return (
    <React.Fragment>
      <NavigationBarFadeIn title={name} />

      <BackdropHeader backdropPath={collectionToBackdropPath(collection)} />

      <Box bgcolor="background.default">
        <Box paddingX={2} paddingTop={2}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          {overview.length > 0 && (
            <React.Fragment>
              <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
              <ReadMore
                text={overview}
                TypographyProps={{ color: "textSecondary", variant: "body1" }}
              />
            </React.Fragment>
          )}
        </Box>
        <Box p={2}>
          {parts.map((part) => (
            <Box key={part.id} marginBottom={2}>
              <MovieCard movie={part} />
            </Box>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};
