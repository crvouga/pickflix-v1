import React from "react";
import { PersonMovieCredit } from "../../tmdb/types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import MovieAvatar from "../../movie/components/MovieAvatar";

type Props = {
  credit: PersonMovieCredit;
};

export default ({ credit }: Props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <MovieAvatar movie={credit} />
      </ListItemAvatar>
      <ListItemText
        primary={credit.title}
        secondary={"job" in credit ? credit.job : credit.character}
      />
    </ListItem>
  );
};
