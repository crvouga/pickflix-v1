import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useHistory } from "react-router";
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
    wordBreak: "break-all",
  },
}));

export default ({ movie, ...props }) => {
  const { id, posterPath, title } = movie;

  const history = useHistory();
  const classes = useStyles();
  const posterURL = makeTMDbImageURL(2, { posterPath });

  const onClick = () => {
    history.push(`/movie/${id}`);
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
