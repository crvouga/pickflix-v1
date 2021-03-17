import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import useBoolean from "../../common/hooks/useBoolean";
import makeImageUrl from "../../media/tmdb/makeImageUrl";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  fallback: {
    wordBreak: "break-word",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  breakWord: {
    wordBreak: "break-word",
  },
  card: {
    borderRadius: theme.spacing(1 / 2),
  },
  skeleton: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  image: {
    zIndex: 2,
    width: "100%",
    height: "100%",
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
  "@keyframes flicker": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 1 / 2,
    },
    "100%": {
      opacity: 1,
    },
  },
  flicker: {
    animation: `$flicker 1s infinite`,
  },
}));

export type Movie = {
  id?: string;
  posterPath?: string | null;
  title?: string | null;
};

type Props = {
  movie: Movie;
  onClick?: () => void;
  sizeIndex?: number;
  disabled?: boolean;
};

export const MOVIE_POSTER_ASPECT_RATIO: [number, number] = [18, 24];

export default (props: Props) => {
  const {
    movie: { id, posterPath, title },
    onClick,
    sizeIndex = 5,
    disabled = false,
  } = props;

  const classes = useStyles();

  const history = useHistory();
  const handleClick = onClick
    ? onClick
    : id
    ? () => {
        history.push(`/movie/${id}`);
      }
    : undefined;

  const imageSrc = makeImageUrl(sizeIndex, { posterPath });

  const { ref, inView } = useInView({});
  const isLoading = useBoolean(true);
  const isMounted = useBoolean(false);

  useEffect(() => {
    if (inView) {
      isMounted.setTrue();
    }
  }, [inView]);

  return (
    <Card className={clsx(classes.card)} ref={ref}>
      <CardActionArea disabled={disabled} onClick={handleClick}>
        <AspectRatio
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          ContainerProps={{
            style: { position: "relative", width: "100%" },
          }}
        >
          {posterPath && isMounted.value && (
            <React.Fragment>
              {isLoading.value && (
                <Skeleton variant="rect" className={classes.skeleton} />
              )}
              <img
                onError={isLoading.setFalse}
                onLoad={isLoading.setFalse}
                className={classes.image}
                src={imageSrc}
              />
            </React.Fragment>
          )}

          {!posterPath && (
            <Typography
              variant="h5"
              align="center"
              className={classes.fallback}
            >
              {title}
            </Typography>
          )}
        </AspectRatio>
      </CardActionArea>
    </Card>
  );
};
