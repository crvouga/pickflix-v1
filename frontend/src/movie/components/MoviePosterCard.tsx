import {
  Box,
  Card,
  CardActionArea,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import { useLazyImage } from "../../common/hooks/useLazyImage";
import { useMakeImageUrl } from "../../tmdb/makeTMDbImageURL";

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
  blur: {
    filter: "blur(8px)",
  },
  unblur: {
    animation: `$unblurEffect ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeIn}`,
  },
  "@keyframes unblurEffect": {
    "0%": {
      filter: "blur(8px)",
    },
    "100%": {
      filter: "blur(0px)",
    },
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

export const MOVIE_POSTER_ASPECT_RATIO: [number, number] = [18, 24];

export default (props: Props) => {
  const { movie, sizeIndex = 5, disabled = false } = props;
  const { id, posterPath, title } = movie;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = () => {
    if (id) {
      history.push(`/movie/${id}`);
    }
  };

  const makeImageUrl = useMakeImageUrl();
  const highQuality = makeImageUrl(sizeIndex, { posterPath }) || "";
  const lowQuality = makeImageUrl(0, { posterPath }) || "";
  const lazyImage = useLazyImage({
    highQuality,
    lowQuality,
  });

  return (
    <Card className={classes.borderRadius} onClick={handleClick}>
      <CardActionArea disabled={disabled}>
        <AspectRatio
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          ContainerProps={{
            style: { position: "relative", width: "100%" },
          }}
        >
          {!posterPath && (
            <Box
              display="flex"
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" className={classes.fallback}>
                {title}
              </Typography>
            </Box>
          )}

          {posterPath && (
            <img
              ref={lazyImage.ref}
              className={clsx(classes.borderRadius, {
                [classes.blur]: lazyImage.src === lowQuality,
                [classes.unblur]: lazyImage.src === highQuality,
              })}
              src={lazyImage.src}
              width="100%"
              height="100%"
            />
          )}
        </AspectRatio>
      </CardActionArea>
    </Card>
  );
};
