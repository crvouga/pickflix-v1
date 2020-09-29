import { Box, Fade, IconButton, makeStyles } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import AbsolutePositionBox from "../../common/components/AbsolutePositionBox";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import { ModalName } from "../../redux/router/types";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { MovieImages, MovieVideos } from "../../tmdb/types";
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

const useDelayedTrueBoolean = (initial: boolean) => {
  const [visible, setVisible] = useState(initial);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const setFalse = () => {
    setVisible(false);
    clearTimeout((timeoutRef.current || 0) as number);
  };
  const setTrue = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 1000);
  };
  return { value: visible, setTrue, setFalse };
};

const renderPoster = (poster: { filePath: string }) => (
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

const renderBackdrop = (backdrop: { filePath: string }) => (
  <img
    alt="movie backdrop"
    key={backdrop.filePath}
    src={makeTMDbImageURL(2, { backdropPath: backdrop.filePath })}
    style={{ width: "100%", height: "100%" }}
  />
);

interface Props {
  videos: MovieVideos;
  images: MovieImages;
}

export default ({ videos, images }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const isPlayIconVisible = useDelayedTrueBoolean(true);

  const handlePlayIconClick = () => {
    dispatch(actions.video.setPlaylist(videos.results));
    dispatch(actions.router.open({ name: ModalName.VideoPlayer }));
  };

  const handleChangeIndex = (index: number, indexLatest: number) => {
    setIndex(index);
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
      ratio={[16, 9]}
      className={classes.root}
      onTouchStart={isPlayIconVisible.setFalse}
      onTouchEnd={isPlayIconVisible.setTrue}
    >
      <SwipeableViews onChangeIndex={handleChangeIndex} value={index}>
        {imageComponents}
      </SwipeableViews>

      {videos.results.length && (
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
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
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
