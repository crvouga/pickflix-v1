import { Fade, IconButton, makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import PlayIcon from "@material-ui/icons/PlayArrow";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import useMakeImageUrl from "../../api/useMakeImageUrl";
import AspectRatio from "../../common/AspectRatio";
import useBoolean from "../../common/useBoolean";
import modal from "../../common/redux/modal";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => {
  const backgroundDefaultColorFade = `
    linear-gradient(
      ${fade(theme.palette.background.default, 0)},
      ${fade(theme.palette.background.default, 1)}
    )`;

  return {
    root: {
      position: "relative",
      width: "100%",
      backgroundColor: "black",
    },
    layer: {
      posiiton: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },

    backdrop: {
      width: "100%",
    },
    fade: {
      pointerEvents: "none",
      position: "absolute",
      bottom: 0,
      left: 0,
      background: backgroundDefaultColorFade,
      width: "100%",
      height: theme.spacing(8),
    },

    playIconContainer: {
      pointerEvents: "none",

      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    playIconButton: {
      pointerEvents: "auto",
    },
    playIcon: {
      opacity: 0.8,
      fontSize: "2em",
    },
  };
});

export default ({ videos, images }) => {
  const classes = useStyles();
  const makeImageUrl = useMakeImageUrl();
  const [index, setIndex] = useState(0);

  const handleChange = (newIndex) => {
    setIndex(newIndex);
  };

  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef();
  const handleMouseDown = () => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
  };
  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 1000);
  };

  const imageLoaded = useBoolean(false);
  const { backdrops, posters } = images;

  const dispatch = useDispatch();
  const handlePlayIconClick = (e) => {
    dispatch(modal.actions.open("videoModal", { videos }));
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.root}>
      <AspectRatio
        ratio={[16, 9]}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <AutoPlaySwipeableViews
          autoPlay={imageLoaded.value}
          interval={4000}
          value={index}
          onChange={handleChange}
        >
          {backdrops.map(({ filePath }, index) => (
            <img
              key={filePath}
              src={makeImageUrl(2, { backdropPath: filePath })}
              className={classes.backdrop}
            />
          ))}
        </AutoPlaySwipeableViews>

        <Fade in={visible}>
          <div className={classes.playIconContainer}>
            <IconButton
              className={classes.playIconButton}
              onClick={handlePlayIconClick}
              onTouchStart={stopPropagation}
            >
              <PlayIcon className={classes.playIcon} />
            </IconButton>
          </div>
        </Fade>
      </AspectRatio>
      <div className={classes.fade} />
    </div>
  );
};
