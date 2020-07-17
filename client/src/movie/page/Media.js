import { Box, Fade, IconButton, makeStyles } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import Layer from "../../common/components/Layer";
import modal from "../../common/redux/modal";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import player from "../../video/redux/player";
import Poster from "../components/Poster";
import * as R from "ramda";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  noPointer: {
    pointerEvents: "none",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  playIcon: {
    opacity: 0.9,
    fontSize: "2em",
  },
  root: {
    width: "100%",
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
  buttonCotaniner: {
    pointerEvents: "all",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.default,
    opacity: 0.5,
  },
}));

const useDelayedTrueBoolean = (initial) => {
  const [visible, setVisible] = useState(initial);
  const timeoutRef = useRef();
  const setFalse = () => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
  };
  const setTrue = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 1000);
  };
  return { value: visible, setTrue, setFalse };
};

const stopPropagation = (e) => e.stopPropagation();

const renderPoster = (poster) => (
  <Box key={poster.filePath} width="100%" position="relative">
    <Layer
      style={{
        filter: "blur(8px)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${makeTMDbImageURL(2, {
          posterPath: poster.filePath,
        })})`,
      }}
    />
    <Poster margin="auto" width="40%" movie={{ posterPath: poster.filePath }} />
  </Box>
);

const renderBackdrop = (backdrop) => (
  <img
    key={backdrop.filePath}
    src={makeTMDbImageURL(2, { backdropPath: backdrop.filePath })}
    style={{ width: "100%", height: "100%" }}
  />
);

export default ({ videos, images }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const isPlayIconVisible = useDelayedTrueBoolean(true);

  const handlePlayIconClick = (e) => {
    dispatch(player.actions.setPlaylist(videos));
    dispatch(modal.actions.open("video"));
  };

  const handleChangeIndex = (newIndex) => {
    setIndex(newIndex);
  };

  const { backdrops, posters } = images;

  if (backdrops.length === 0 && posters.length === 0) {
    return null;
  }

  const imageComponents = R.take(
    20,
    R.concat(backdrops.map(renderBackdrop), posters.map(renderPoster))
  );

  return (
    <AspectRatio
      ratio="16/9"
      className={classes.root}
      onTouchStart={isPlayIconVisible.setFalse}
      onTouchEnd={isPlayIconVisible.setTrue}
    >
      <AutoPlaySwipeableViews
        onChangeIndex={handleChangeIndex}
        interval={4000}
        value={index}
      >
        {imageComponents}
      </AutoPlaySwipeableViews>

      <Fade in={videos.length !== 0 && isPlayIconVisible.value}>
        <Layer
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.noPointer}
        >
          <div className={classes.buttonCotaniner}>
            <IconButton
              color="default"
              onTouchStart={stopPropagation}
              onClick={handlePlayIconClick}
            >
              <PlayIcon className={classes.playIcon} />
            </IconButton>
          </div>
        </Layer>
      </Fade>
    </AspectRatio>
  );
};
