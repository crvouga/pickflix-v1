import { Box, makeStyles, Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import moment from "moment";
import React, { useState } from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Layer from "../common/components/Layer";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
  box: {
    backgroundImage: ({ movieBackdropURL }) => `url(${movieBackdropURL})`,
    backgroundSize: "cover",
    maxWidth: "100%",
    minWidth: "100%",
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
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
    <Box onClick={handleClick} position="relative">
      <AspectRatio ratio="16/9" className={classes.box} />
      <Layer
        display="flex"
        flexDirection="column-reverse"
        paddingX={2}
        paddingY={3}
      >
        <div>
          <Typography variant="h6" style={{ fontWeight: "bold" }} noWrap>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1">
            {moment(movie.releaseDate).format("Y")}
          </Typography>
        </div>
      </Layer>
    </Box>
  );
};

export default ({ movies }) => {
  const [index, setIndex] = useState(0);

  return (
    <AutoPlaySwipeableViews interval={5000} value={index} onChange={setIndex}>
      {movies.map((movie) => (
        <HeaderItem key={movie.id} movie={movie} />
      ))}
    </AutoPlaySwipeableViews>
  );
};
