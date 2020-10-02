import {
  Box,
  makeStyles,
  Paper,
  Typography,
  BoxProps,
  useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import useBoolean from "../../common/hooks/useBoolean";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Movie } from "../../tmdb/types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
  },
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
}));

interface Props extends BoxProps {
  skeleton?: boolean;
  movie: {
    id?: string;
    posterPath?: string | null;
    title?: string | null;
  };
  sizeIndex?: number;
}

export default (props: Props) => {
  const { skeleton, movie, sizeIndex = 3, ...restOfProps } = props;

  const classes = useStyles();
  const isLoading = useBoolean(true);
  const { id, posterPath, title } = movie;
  const theme = useTheme();
  const dispatch = useDispatch();
  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });

  const handleClick = () => {
    if (id) {
      dispatch(actions.router.push({ pathname: `/movie/${id}` }));
    }
  };

  return (
    <Box
      className={classes.root}
      onClick={handleClick}
      width="180px"
      {...restOfProps}
    >
      <AspectRatio
        ratio={[18, 24]}
        ContainerProps={{
          style: { position: "relative", width: "100%" },
        }}
      >
        {!skeleton && !posterPath && (
          <Typography className={classes.fallback}>{title}</Typography>
        )}

        {!skeleton && posterPath && (
          <LazyLoadImage
            style={{ borderRadius: theme.spacing(2) }}
            beforeLoad={isLoading.setTrue}
            afterLoad={isLoading.setFalse}
            effect="opacity"
            src={posterURL}
            width="100%"
            height="100%"
          />
        )}

        {skeleton && (
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height="100%"
            style={{ borderRadius: theme.spacing(2) }}
          />
        )}
      </AspectRatio>
    </Box>
  );
};
