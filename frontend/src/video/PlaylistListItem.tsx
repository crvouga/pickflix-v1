import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { MovieVideo } from "../tmdb/types";
import * as youtubeAPI from "../youtube/api";

type Props = {
  video: MovieVideo;
};

export default (props: Props) => {
  const { video } = props;

  const dispatch = useDispatch();

  const isPlaying = useSelector(selectors.video.isPlaying);
  const currentVideo = useSelector(selectors.video.video);

  const handleClick = () => {
    if (video.key === currentVideo?.key) {
      dispatch(actions.video.toggle());
    } else {
      dispatch(actions.video.setVideo(video));
      dispatch(actions.video.play());
    }
  };

  const image = youtubeAPI.videoKeyToThumbnailURL(video.key);

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar variant="square" src={image} />
      </ListItemAvatar>
      <ListItemText primary={video.name} secondary={video.type} />
      <ListItemSecondaryAction>
        {isPlaying && currentVideo?.key === video.key ? (
          <PauseIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
