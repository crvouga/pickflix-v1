import { makeStyles, Typography, ButtonBase } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import useMakeImageUrl from "../tmdb/useMakeImageUrl";
import AspectRatio from "../common/AspectRatio";

const width = 180;

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
    backgroundImage: ({ posterURL, backdropURL }) =>
      `url(${backdropURL || posterURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
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
  const makeImageUrl = useMakeImageUrl();
  const backdropURL = makeImageUrl(2, { backdropPath });
  const posterURL = makeImageUrl(2, { posterPath });
  const classes = useStyles({ backdropURL, posterURL });

  return (
    <ButtonBase
      disableRipple
      disableTouchRipple
      component={AspectRatio}
      ratio={[16, 9]}
      className={classes.root}
      {...props}
    >
      {backdropURL || posterURL ? (
        <div className={classes.image} />
      ) : (
        <div className={classes.fallback}>
          <Typography align="center" color="textSecondary">
            <MovieIcon className={classes.movieIcon} />
          </Typography>
        </div>
      )}
    </ButtonBase>
  );
};
