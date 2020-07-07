import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import player from "./redux/player";
import YoutubeThumbnail from "./YoutubeThumbnail";

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
  thumbnail: {
    width: "50%",
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

export default ({ onVideoClick, videos }) => {
  const classes = useStyles();

  const playing = useSelector((state) => state.player.playing);
  const video = useSelector((state) => state.player.video);

  const handleVideoClick = (clickedVideo) => () => onVideoClick(clickedVideo);
  const isSelected = (v) => video?.key === v.key;

  return (
    <div>
      {videos.map((video) => (
        <ButtonBase
          onClick={handleVideoClick(video)}
          component="div"
          className={clsx(classes.root, {
            [classes.selected]: isSelected(video),
          })}
        >
          <div className={classes.marker}>
            {isSelected(video) && (
              <div className={classes.icon}>
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
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
    </div>
  );
};
