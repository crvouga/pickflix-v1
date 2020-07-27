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

const Fallback = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography component="div" className={classes.fallback}>
      {title}
    </Typography>
  );
};

export default trackWindowScroll((props) => {
  const {
    skeleton,
    SkeletonProps,
    scrollPosition,
    movie,
    sizeIndex = 3,
    ...restOfProps
  } = props;

  const isLoading = useBoolean(true);
  const { id, posterPath, title } = movie || {};
  const theme = useTheme();

  const posterURL = makeTMDbImageURL(sizeIndex, { posterPath });
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(push(`/movie/${id}`));
  };

  if (skeleton)
    return (
      <Box
        component={Paper}
        borderRadius={theme.spacing(1)}
        variant="outlined"
        minWidth="150px"
        width="150px"
        {...restOfProps}
        minWidth={restOfProps.width}
        width={restOfProps.width}
      >
        <AspectRatio
          ratio="18/24"
          style={{ position: "relative", width: "100%" }}
        >
          <Skeleton
            style={{ borderRadius: theme.spacing(1) }}
            variant="rect"
            width="100%"
            height="100%"
            {...SkeletonProps}
          />
        </AspectRatio>
      </Box>
    );

  return (
    <Box
      component={Paper}
      borderRadius={theme.spacing(1)}
      onClick={handleClick}
      variant="outlined"
      minWidth="150px"
      width="150px"
      {...restOfProps}
    >
      <AspectRatio
        ratio="18/24"
        style={{ position: "relative", width: "100%" }}
      >
        {posterPath ? (
          <LazyLoadImage
            scrollPosition={scrollPosition}
            beforeLoad={isLoading.setTrue}
            afterLoad={isLoading.setFalse}
            effect="opacity"
            src={posterURL}
            width="100%"
            height="100%"
            style={{ borderRadius: theme.spacing(1) }}
          />
        ) : (
          <Fallback title={title} />
        )}

        {(isLoading.value || !posterPath) && (
          <AbsolutePositionBox>
            <Skeleton
              style={{ borderRadius: theme.spacing(1) }}
              variant="rect"
              width="100%"
              height="100%"
              {...SkeletonProps}
            />
          </AbsolutePositionBox>
        )}
      </AspectRatio>
    </Box>
  );
});
