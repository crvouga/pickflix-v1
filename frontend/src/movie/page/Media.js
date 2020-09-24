import { Box, Fade, IconButton, makeStyles } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import React, { useRef, useState } from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import AbsolutePositionBox from "../../common/components/AbsolutePositionBox";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import Poster from "../components/Poster";

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
    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
  buttonCotaniner: {
    pointerEvents: "all",
    borderRadius: "50%",
    background: `radial-gradient(circle at center, ${theme.palette.background.default} 0, transparent 80%)`,
    opacity: 0.8,
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
  <Box key={poster.filePath} width="100%" height="100%" position="relative">
    <AbsolutePositionBox
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
    alt="movie backdrop"
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
    dispatch(actions.player.setPlaylist(videos));
    dispatch(actions.modal.open("video"));
  };

  const handleChangeIndex = (newIndex) => {
    setIndex(newIndex);
  };

  const { backdrops, posters } = images;

  if (backdrops.length === 0 && posters.length === 0) {
    return null;
  }

  const imageComponents =
    backdrops.length === 0
      ? posters.map(renderPoster)
      : backdrops.map(renderBackdrop);

  return (
    <AspectRatio
      ratio="16/9"
      className={classes.root}
      onTouchStart={isPlayIconVisible.setFalse}
      onTouchEnd={isPlayIconVisible.setTrue}
    >
      <SwipeableViews
        onChangeIndex={handleChangeIndex}
        interval={4000}
        value={index}
      >
        {imageComponents}
      </SwipeableViews>

      {videos.length && (
        <Fade in={isPlayIconVisible.value}>
          <AbsolutePositionBox
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
          </AbsolutePositionBox>
        </Fade>
      )}
    </AspectRatio>
  );
};
