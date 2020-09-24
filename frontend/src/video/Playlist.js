import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import YoutubeThumbnail from "../youtube/Thumbnail";
import player from "./redux/player";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
  root: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    textAlign: "left",
  },

  text: {
    flex: 1,
    overflow: "hidden",
    height: "100%",
    minHeight: "100%",
    maxHeight: (9 / 16) * 180,
    padding: theme.spacing(1),
    paddingTop: 0,
    marginBottom: "auto",
  },
  icon: {
    marginLeft: -theme.spacing(1),
  },
  marker: {
    width: theme.spacing(2),
  },
  thumbnail: {
    width: "50%",
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPlaying = useSelector(player.selectors.isPlaying);
  const video = useSelector(player.selectors.video);
  const videos = useSelector(player.selectors.playlist);

  const isSelected = (v) => video?.key === v.key;
  const handleVideoClick = (clickedVideo) => () => {
    if (clickedVideo.key === video?.key) {
      dispatch(player.actions.toggle());
    } else {
      dispatch(player.actions.setVideo(clickedVideo));
      dispatch(player.actions.play());
    }
  };

  return (
    <React.Fragment>
      {videos.map((video) => (
        <ButtonBase
          key={video.key}
          onClick={handleVideoClick(video)}
          component="div"
          className={clsx(classes.root, {
            [classes.selected]: isSelected(video),
          })}
        >
          <div className={classes.marker}>
            {isSelected(video) && (
              <div className={classes.icon}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </div>
            )}
          </div>

          <YoutubeThumbnail className={classes.thumbnail} video={video} />
          <div className={classes.text}>
            <Typography>{video.name}</Typography>
            <Typography color="textSecondary">{video.type}</Typography>
          </div>
        </ButtonBase>
      ))}
    </React.Fragment>
  );
};
