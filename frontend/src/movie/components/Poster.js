import {
  Box,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { push } from "connected-react-router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch } from "react-redux";
import AbsolutePositionBox from "../../common/components/AbsolutePositionBox";
import useBoolean from "../../common/hooks/useBoolean";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

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
}));

export default trackWindowScroll((props) => {
  const {
    scrollPosition,
    skeleton,
    SkeletonProps = {},
    movie = {},
    sizeIndex = 3,
    ...restOfProps
  } = props;

  const classes = useStyles();
  const isLoading = useBoolean(true);
  const { id, posterPath, title } = movie;
  const theme = useTheme();
  const dispatch = useDispatch();
  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });

  const handleClick = () => {
    if (id) {
      dispatch(push(`/movie/${id}`));
    }
  };

  return (
    <Box
      component={Paper}
      borderRadius={theme.spacing(2)}
      onClick={handleClick}
      variant="outlined"
      width="180px"
      {...restOfProps}
    >
      <AspectRatio
        ratio="18/24"
        style={{ position: "relative", width: "100%" }}
      >
        {!skeleton && !posterPath && (
          <Typography className={classes.fallback}>{title}</Typography>
        )}

        {!skeleton && posterPath && (
          <LazyLoadImage
            style={{ borderRadius: theme.spacing(2) }}
            scrollPosition={scrollPosition}
            beforeLoad={isLoading.setTrue}
            afterLoad={isLoading.setFalse}
            effect="opacity"
            src={posterURL}
            width="100%"
            height="100%"
          />
        )}

        {(skeleton || (posterPath && isLoading.value)) && (
          <AbsolutePositionBox>
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="100%"
              style={{ borderRadius: theme.spacing(2) }}
              {...SkeletonProps}
            />
          </AbsolutePositionBox>
        )}
      </AspectRatio>
    </Box>
  );
});
