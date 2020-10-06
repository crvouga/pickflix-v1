import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../../backendAPI";
import { actions } from "../../redux";
import { Collection } from "../../tmdb/types";
import BackdropHeader from "./BackdropHeader";
import MovieCard from "../components/MovieCard";
import { collectionToBackdropPath } from "./utils";
import ReadMore from "../../common/components/ReadMoreTypography";
import NavigationBar from "../../common/NavigationBar";

export default () => {
  const dispatch = useDispatch();
  const { collectionId } = useParams<{ collectionId: string }>();

  const query = useQuery<Collection, string>(
    ["collection", collectionId].join(""),
    () =>
      backendAPI
        .get(`/api/tmdb/collection/${collectionId}`)
        .then((res) => res.data),
    {}
  );

  if (query.status === "error") {
    return null;
  }

  if (query.status === "loading") {
    return null;
  }

  const collection = query.data;
  const { name, overview, parts, backdropPath } = collection;

  const handleClick = (part: { id: string }) => () => {
    dispatch(actions.router.push({ pathname: `/movie/${part.id}` }));
  };

  return (
    <React.Fragment>
      <NavigationBar title={name} />

      <BackdropHeader backdropPath={collectionToBackdropPath(collection)} />

      <Box bgcolor="background.default">
        <Box paddingX={2} paddingTop={2}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          {overview.length > 0 && (
            <React.Fragment>
              <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
              <ReadMore text={overview} color="textSecondary" variant="body1" />
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
