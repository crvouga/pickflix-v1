import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Movie } from "../../tmdb/types";
import { useHistory } from "react-router";

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
}));

interface Props extends BoxProps {
  movie: Movie;
}

export default ({ movie, ...restOfProps }: Props) => {
  const { backdropPath, posterPath } = movie;
  const backdropURL = makeTMDbImageURL(2, { backdropPath });
  const posterURL = makeTMDbImageURL(2, { posterPath });
  const classes = useStyles({ backdropURL, posterURL });
  const history = useHistory();
  const onClick = () => {
    if (movie.id) {
      history.push(`/movie/${movie.id}`);
    }
  };
  return (
    <Box onClick={onClick} {...restOfProps}>
      <AspectRatio
        ratio={[16, 9]}
        ContainerProps={{ style: { width: "100%" } }}
      >
        {backdropURL || posterURL ? (
          <LazyLoadImage
            effect="opacity"
            className={classes.image}
            src={backdropURL || posterURL}
          />
        ) : (
          <div className={classes.fallback}></div>
        )}
      </AspectRatio>
    </Box>
  );
};
