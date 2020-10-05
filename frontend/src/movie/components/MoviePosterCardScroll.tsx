import { Box, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import MovieCard, { MoviePosterCardProps } from "./MoviePosterCard";

interface Props {
  title: string;
  movies: MoviePosterCardProps[];
}

export default ({ title, movies }: Props) => {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: "bold" },
            variant: "h6",
          }}
          primary={title}
        />
      </ListItem>
      <HorizontalScroll paddingLeft={2} marginBottom={2}>
        {movies.map((movie) => (
          <Box width="180px" key={movie.id} marginRight={2}>
            <MovieCard {...movie} />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
