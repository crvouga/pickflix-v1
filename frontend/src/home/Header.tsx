import { makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import SwipeableViews from "react-swipeable-views";
import AbsolutePositionBox from "../common/components/AbsolutePositionBox";
import AspectRatio from "../common/components/AspectRatio";
import makeImageUrl from "../tmdb/makeImageUrl";
import { Movie } from "../tmdb/types";

const useStyles = makeStyles({
  box: {
    backgroundImage: ({ movieBackdropURL }: { movieBackdropURL?: string }) =>
      `url(${movieBackdropURL})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
  },
});

const HeaderItem = ({ movie }: { movie: Movie }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };
  const movieBackdropURL = makeImageUrl(2, {
    backdropPath: movie.backdropPath,
  });
  const classes = useStyles({
    movieBackdropURL,
  });

  return (
    <AspectRatio ratio={[16, 9]} ContainerProps={{ onClick: handleClick }}>
      <div className={classes.box} />
      <AbsolutePositionBox
        paddingX={2}
        paddingY={3}
        display="flex"
        flexDirection="column-reverse"
      >
        <Typography variant="subtitle1">
          {moment(movie.releaseDate).format("Y")}
        </Typography>
        <Typography variant="h6" style={{ fontWeight: "bold" }} noWrap>
          {movie.title}
        </Typography>
      </AbsolutePositionBox>
    </AspectRatio>
  );
};

interface Props {
  movies: Movie[];
}

export default ({ movies }: Props) => {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (newIndex: number) => {
    setIndex(newIndex);
  };
  return (
    <SwipeableViews
      // interval={5000}
      value={index}
      onChangeIndex={handleChangeIndex}
    >
      {movies.map((movie) => (
        <HeaderItem key={movie.id} movie={movie} />
      ))}
    </SwipeableViews>
  );
};
