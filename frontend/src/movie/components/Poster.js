import {
  Box,
  makeStyles,
  Typography,
  useTheme,
  Paper,
} from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useDispatch } from "react-redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.spacing(1),
  },
  fallback: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    textAlign: "center",
    padding: theme.spacing(1),
    width: "100%",
    wordBreak: "break-word",
    fontWeight: "bold",
  },
}));

export default ({ movie, sizeIndex = 3, ...props }) => {
  const { id, posterPath, title } = movie;
  const theme = useTheme();
  const classes = useStyles();
  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(push(`/movie/${id}`));
  };

  return (
    <Box
      component={Paper}
      borderRadius={theme.spacing(1)}
      onClick={handleClick}
      variant="outlined"
      {...props}
    >
      <AspectRatio ratio="18/24">
        {posterPath ? (
          <LazyLoadImage
            effect="opacity"
            src={posterURL}
            width="100%"
            height="100%"
            className={classes.image}
          />
        ) : (
          <Typography component="div" className={classes.fallback}>
            {title}
          </Typography>
        )}
      </AspectRatio>
    </Box>
  );
};
