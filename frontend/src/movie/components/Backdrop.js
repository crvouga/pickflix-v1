import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

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

export default ({ movie, ...restOfProps }) => {
  const { backdropPath, posterPath } = movie;
  const backdropURL = makeTMDbImageURL(2, { backdropPath });
  const posterURL = makeTMDbImageURL(2, { posterPath });
  const classes = useStyles({ backdropURL, posterURL });

  return (
    <Box {...restOfProps}>
      <AspectRatio ratio="16/9" style={{ width: "100%" }}>
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
