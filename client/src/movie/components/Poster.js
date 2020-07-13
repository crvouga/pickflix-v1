import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
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
    <AspectRatio
      ratio={[2, 3]}
      onClick={onClick}
      className={classes.root}
      {...props}
    >
      {posterPath ? (
        <LazyLoadImage className={classes.image} src={posterURL} />
      ) : (
        <Typography
          align="center"
          color="textSecondary"
          className={classes.fallback}
        >
          {title}
        </Typography>
      )}
    </AspectRatio>
  );
};
