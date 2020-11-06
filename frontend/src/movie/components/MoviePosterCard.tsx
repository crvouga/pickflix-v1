import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
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
import makeImageUrl from "../../tmdb/makeImageUrl";

const useStyles = makeStyles((theme) => ({
  breakWord: {
    wordBreak: "break-word",
  },
  borderRadius: {
    borderRadius: theme.spacing(1 / 2),
  },
  blur: {
    filter: "blur(4px)",
  },
  unblur: {
    animation: `$unblurEffect ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeIn}`,
  },
  "@keyframes unblurEffect": {
    "0%": {
      filter: "blur(4px)",
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
  noLink?: boolean;
  sizeIndex?: number;
  disabled?: boolean;
};

export const MOVIE_POSTER_ASPECT_RATIO: [number, number] = [18, 24];

export default (props: Props) => {
  const {
    movie: { id, posterPath, title },
    sizeIndex = 5,
    disabled = false,
    noLink = false,
  } = props;

  const classes = useStyles();

  const history = useHistory();
  const handleClick = () => {
    if (id && !noLink) {
      history.push(`/movie/${id}`);
    }
  };

  const highQuality = makeImageUrl(sizeIndex, { posterPath });
  const lowQuality = makeImageUrl(0, { posterPath });
  const lazyImage = useLazyImage({
    highQuality,
    lowQuality,
  });

  return (
    <Card
      className={classes.borderRadius}
      onClick={handleClick}
      ref={lazyImage.ref}
    >
      <CardActionArea disabled={disabled || noLink}>
        <AspectRatio
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          ContainerProps={{
            style: { position: "relative", width: "100%" },
          }}
        >
          {posterPath && lazyImage.src && (
            <CardMedia
              className={clsx(classes.borderRadius, {
                [classes.blur]: lazyImage.src === lowQuality,
                [classes.unblur]: lazyImage.src === highQuality,
              })}
              style={{
                width: "100%",
                height: "100%",
              }}
              image={lazyImage.src}
            />
          )}

          {!posterPath && (
            <Box
              style={{
                wordBreak: "break-word",
              }}
              display="flex"
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <Typography variant="h5" align="center">
                {title}
              </Typography>
            </Box>
          )}
        </AspectRatio>
      </CardActionArea>
    </Card>
  );
};
