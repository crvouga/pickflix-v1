import { Card, CardActionArea, makeStyles } from "@material-ui/core";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import makeImageUrl from "../../media/tmdb/makeImageUrl";

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
  disabled?: boolean;
};

export const MOVIE_POSTER_ASPECT_RATIO: [number, number] = [16, 9];

export default (props: Props) => {
  const { movie, sizeIndex = 4, disabled = false } = props;
  const { id, posterPath } = movie;
  const classes = useStyles();

  const posterURL = makeImageUrl(sizeIndex, { posterPath });

  const history = useHistory();
  const handleClick = () => {
    if (id) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <Card className={classes.borderRadius} onClick={handleClick}>
      <CardActionArea disabled={disabled}>
        <AspectRatio
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          ContainerProps={{
            style: { position: "relative", width: "100%" },
          }}
        >
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
