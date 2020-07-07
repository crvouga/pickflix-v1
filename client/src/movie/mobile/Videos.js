import { Box, ButtonBase, makeStyles, Typography } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import * as R from "ramda";
import React from "react";
import { useDispatch } from "react-redux";
import modal from "../../common/redux/modal";
import player from "../../video/redux/player";
import YoutubeThumbnail from "../../video/YoutubeThumbnail";
import HorizontalScroll from "../../common/HorizontalScroll";

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: {
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    flexWrap: "nowrap",
  },
  thumbnailContainer: {
    position: "relative",
    padding: theme.spacing(1),
    paddingTop: 0,
    minWidth: "240px",
    maxWidth: "240px",
  },
  button: {
    textAlign: "left",
    width: "100%",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playArrowIcon: {
    width: "48px",
    height: "48px",
    opacity: 0.6,
  },
}));

const renderNameNumberPair = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

const renderText = (videos) =>
  videos.length === 0
    ? "No Videos"
    : R.pipe(
        R.countBy(R.prop("type")),
        R.toPairs,
        R.map(renderNameNumberPair),
        R.intersperse(" • ")
      )(videos);

export default ({ videos }) => {
  const classes = useStyles();
  const disabled = videos.length === 0 || false;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(modal.actions.open("videoModal", { videos }));
  };

  const handleVideoClick = (video) => () => {
    dispatch(modal.actions.open("videoModal", { videos }));
    dispatch(player.actions.setVideo(video));
  };

  return (
    <div className={classes.root}>
      <ButtonBase
        component="div"
        className={clsx(classes.button, {
          [classes.disabled]: disabled,
        })}
        disabled={disabled}
        onClick={handleClick}
      >
        <Typography noWrap style={{ fontWeight: "bold", flex: 1 }}>
          {renderText(videos)}
        </Typography>
        <Box color="text.secondary">
          <UnfoldMoreIcon color="inherit" fontSize="small" />
        </Box>
      </ButtonBase>
      {videos.length > 0 && (
        <Box paddingBottom={2}>
          <HorizontalScroll>
            {videos.map((video) => (
              <div
                className={classes.thumbnailContainer}
                onClick={handleVideoClick(video)}
              >
                <ButtonBase disableTouchRipple>
                  <YoutubeThumbnail video={video} />
                  <div className={classes.playIconContainer}>
                    <PlayArrowIcon className={classes.playArrowIcon} />
                  </div>
                </ButtonBase>
                <Typography variant="subtitle2" color="textSecondary">
                  {video.name}
                </Typography>
              </div>
            ))}
          </HorizontalScroll>
        </Box>
      )}
    </div>
  );
};
