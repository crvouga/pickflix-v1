import { Box, makeStyles, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import AspectRatio from "../common/AspectRatio";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => {
  const backgroundDefaultColorFade = `
    linear-gradient(
      ${fade(theme.palette.background.default, 0)},
      ${fade(theme.palette.background.default, 1)}
    )`;

  return {
    root: {
      position: "relative",
      width: "100%",
      backgroundColor: "black",
    },
    layer: {
      posiiton: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },

    fade: {
      background: backgroundDefaultColorFade,
    },

    item: {
      width: "100%",
      position: "relative",
      backgroundImage: ({ movieBackdropURL }) => `url(${movieBackdropURL})`,
      backgroundSize: "cover",
    },
    content: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  };
});

const HeaderItem = ({ movie }) => {
  const history = useHistory();
  const movieBackdropURL = makeTMDbImageURL(3, {
    backdropPath: movie.backdropPath,
  });
  const classes = useStyles({
    movieBackdropURL,
  });

  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };

  return (
    <AspectRatio
      onClick={handleClick}
      ratio={[16, 9]}
      classes={{ content: classes.content, root: classes.item }}
    >
      <Box paddingX={2} paddingY={3} className={classes.fade}>
        <Typography variant="h6" style={{ fontWeight: "bold" }} noWrap>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1">
          {moment(movie.tagline).format("Y")}
        </Typography>
      </Box>
    </AspectRatio>
  );
};

export default ({ movies }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  return (
    <AutoPlaySwipeableViews
      autoPlay
      interval={5000}
      value={index}
      onChange={setIndex}
    >
      {movies.map((movie) => (
        <HeaderItem key={movie.id} movie={movie} />
      ))}
    </AutoPlaySwipeableViews>
  );
};
