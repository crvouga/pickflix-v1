import { Box, CardMedia, Typography, List } from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Collection } from "../../tmdb/types";
import Poster from "../components/Poster";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import backendAPI from "../../backendAPI";
import BackdropHeader from "../components/BackdropHeader";
import BackdropCard from "../components/BackdropCard";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import { collectionToBackdropPath } from "./utils";

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
    <div>
      <BackdropHeader backdropPath={collectionToBackdropPath(collection)} />

      <Box bgcolor="background.default">
        <Box paddingX={2} paddingTop={2}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {overview}
          </Typography>
        </Box>
        <Box p={2}>
          {parts.map((part) => (
            <Box key={part.id} marginBottom={2}>
              <BackdropCard onClick={handleClick(part)} movie={part} />
            </Box>
          ))}
        </Box>
        {/* <Box
          width="100%"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          paddingX={1}
          paddingTop={2}
        >
          {parts.map((part) => (
            <Box key={part.id} width="50%" p={1 / 2}>
              <Poster width="100%" movie={part} />
            </Box>
          ))}
        </Box> */}
      </Box>
    </div>
  );
};
