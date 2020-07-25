import { Box, makeStyles, Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch } from "react-redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },
  fallback: {
    padding: theme.spacing(1),
    width: "100%",
    height: "100%",
    wordBreak: "break-word",
    fontWeight: "bold",
  },
}));

export default ({ movie, sizeIndex = 2, ...props }) => {
  const { id, posterPath, title } = movie;

  const classes = useStyles();
  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(push(`/movie/${id}`));
  };

  return (
    <Box
      component={AspectRatio}
      ratio="18/24"
      onClick={onClick}
      className={classes.root}
      {...props}
    >
      {posterPath ? (
        <LazyLoadImage
          effect="opacity"
          className={classes.image}
          src={posterURL}
        />
      ) : (
        <Typography
          align="center"
          color="textPrimary"
          className={classes.fallback}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};
