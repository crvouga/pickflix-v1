import { makeStyles, Typography, ButtonBase } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import AspectRatio from "../../common/components/AspectRatio";
import { useHistory } from "react-router";

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

  const backdropURL = makeTMDbImageURL(2, { backdropPath });
  const posterURL = makeTMDbImageURL(2, { posterPath });
  const classes = useStyles({ backdropURL, posterURL });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };

  return (
    <ButtonBase
      disableRipple
      disableTouchRipple
      component={AspectRatio}
      ratio={[16, 9]}
      className={classes.root}
      onClick={handleClick}
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
