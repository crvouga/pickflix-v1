import {
  Button,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
} from "@material-ui/core";
import { take, uniqBy } from "ramda";
import React from "react";
import { MovieRecommendations, MovieSimilar } from "../../tmdb/types";
import MoviePosterScroll from "../components/MoviePosterScroll";
import useBoolean from "../../common/hooks/useBoolean";
import MovieRelatedDialog from "./MovieRelatedDialog";

export default ({
  tmdbMediaId,
  similar,
  recommendations,
}: {
  tmdbMediaId: string;
  similar: MovieSimilar;
  recommendations: MovieRecommendations;
}) => {
  const isOpen = useBoolean(false);
  const movies = take(
    15,
    uniqBy((movie) => movie.id, [
      ...similar.results,
      ...recommendations.results,
    ])
  );

  if (movies.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <MovieRelatedDialog
        tmdbMediaId={tmdbMediaId}
        open={isOpen.value}
        onClose={isOpen.setFalse}
      />
      <List disablePadding>
        <ListItem button onClick={isOpen.setTrue}>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="People Also Liked"
          />
          <ListItemSecondaryAction>
            <Button onClick={isOpen.setTrue}>See All</Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <MoviePosterScroll movies={movies} />
    </React.Fragment>
  );
};
