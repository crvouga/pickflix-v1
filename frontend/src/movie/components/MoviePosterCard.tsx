import {
  Card,
  CardActionArea,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
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
  borderRadius: {
    borderRadius: theme.spacing(1 / 2),
  },
}));

export type Movie = {
  id?: string;
  posterPath?: string | null;
  title?: string | null;
};

type Props = {
  movie: Movie;
  sizeIndex?: number;
};

export const MOVIE_POSTER_ASPECT_RATIO: [number, number] = [18, 24];

export default (props: Props) => {
  const { movie, sizeIndex = 4 } = props;
  const { id, posterPath, title } = movie;
  const classes = useStyles();
  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });

  const history = useHistory();
  const handleClick = () => {
    if (id) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <Card className={classes.borderRadius} onClick={handleClick}>
      <CardActionArea>
        <AspectRatio
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          ContainerProps={{
            style: { position: "relative", width: "100%" },
          }}
        >
          {!posterPath && (
            <Typography className={classes.fallback}>{title}</Typography>
          )}

          {posterPath && (
            <LazyLoadImage
              className={classes.borderRadius}
              effect="opacity"
              src={posterURL}
              width="100%"
              height="100%"
            />
          )}
        </AspectRatio>
      </CardActionArea>
    </Card>
  );
};
