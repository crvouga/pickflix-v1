import { Box, makeStyles, Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import moment from "moment";
import React, { useState } from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import AbsolutePositionBox from "../common/components/AbsolutePositionBox";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

const useStyles = makeStyles({
  box: {
    backgroundImage: ({ movieBackdropURL }) => `url(${movieBackdropURL})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
  },
});

const HeaderItem = ({ movie }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(push(`/movie/${movie.id}`));
  };
  const movieBackdropURL = makeTMDbImageURL(2, {
    backdropPath: movie.backdropPath,
  });
  const classes = useStyles({
    movieBackdropURL,
  });

  return (
    <Box component={AspectRatio} ratio="16/9" onClick={handleClick}>
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
    </Box>
  );
};

export default ({ movies }) => {
  const [index, setIndex] = useState(0);

  return (
    <SwipeableViews
      // interval={5000}
      value={index}
      onChange={setIndex}
    >
      {movies.map((movie) => (
        <HeaderItem key={movie.id} movie={movie} />
      ))}
    </SwipeableViews>
  );
};
