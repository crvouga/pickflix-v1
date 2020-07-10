import { Fade, IconButton, makeStyles, Box } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import AspectRatio from "../../common/AspectRatio";
import Cover from "../../common/Cover";
import modal from "../../common/redux/modal";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import player from "../../video/redux/player";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "auto",
  },
  playIcon: {
    opacity: 0.9,
    fontSize: "2em",
  },
  fadeBottom: {
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
  buttonCotaniner: {
    borderRadius: "50%",
    backgroundColor: theme.palette.background.default,
    opacity: 0.6,
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

export default ({ videos, images }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const isPlayIconVisible = useDelayedTrueBoolean(true);
  const { backdrops, posters } = images;

  const handlePlayIconClick = (e) => {
    dispatch(player.actions.setPlaylist(videos));
    dispatch(modal.actions.open("videoModal"));
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <AspectRatio
      ratio={[16, 9]}
      onTouchStart={isPlayIconVisible.setFalse}
      onTouchEnd={isPlayIconVisible.setTrue}
      className={classes.fadeBottom}
    >
      <AutoPlaySwipeableViews interval={4000} value={index} onChange={setIndex}>
        {backdrops.map(({ filePath }) => (
          <img
            key={filePath}
            src={makeTMDbImageURL(2, { backdropPath: filePath })}
            className={classes.image}
          />
        ))}
        {posters.map(({ filePath }) => (
          <img
            key={filePath}
            src={makeTMDbImageURL(2, { posterPath: filePath })}
            className={classes.image}
          />
        ))}
      </AutoPlaySwipeableViews>
      <Fade in={videos.length > 0 && isPlayIconVisible.value}>
        <Cover>
          <Box className={classes.buttonCotaniner}>
            <IconButton
              color="default"
              onClick={handlePlayIconClick}
              onTouchStart={stopPropagation}
            >
              <PlayIcon className={classes.playIcon} />
            </IconButton>
          </Box>
        </Cover>
      </Fade>
    </AspectRatio>
  );
};
