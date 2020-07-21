import { Box, makeStyles, Typography, ButtonBase } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { useHistory } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },
  fallback: {
    backgroundColor: "#202020",
    width: "100%",
    height: "100%",
  },

  movieIcon: {
    marginTop: 18,
    fontSize: 48,
  },

  root: {
    borderRadius: theme.spacing(1),
    width: "100%",
  },
}));

export default ({ movie, ...props }) => {
  const { backdropPath, posterPath } = movie;

  const backdropURL = makeTMDbImageURL(2, { backdropPath });
  const posterURL = makeTMDbImageURL(2, { posterPath });
  const classes = useStyles({ backdropURL, posterURL });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };

  return (
    <Box
      component={AspectRatio}
      ratio="16/9"
      className={classes.root}
      onClick={handleClick}
      {...props}
    >
      {backdropURL || posterURL ? (
        <LazyLoadImage
          effect="opacity"
          className={classes.image}
          src={backdropURL || posterURL}
        />
      ) : (
        <div className={classes.fallback}>
          <Typography align="center" color="textSecondary">
            <MovieIcon className={classes.movieIcon} />
          </Typography>
        </div>
      )}
    </Box>
  );
};
