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
import { MovieVideo } from "../tmdb/types";
import * as youtubeAPI from "../youtube/api";
import { video } from "./redux/video";

type Props = {
  playlistVideo: MovieVideo;
};

export default (props: Props) => {
  const { playlistVideo } = props;

  const dispatch = useDispatch();

  const isPlaying = useSelector(video.selectors.isPlaying);
  const currentVideo = useSelector(video.selectors.currentVideo);

  const selected = playlistVideo.key === currentVideo?.key;

  const handleClick = () => {
    if (selected) {
      dispatch(video.actions.setIsPlaying(!isPlaying));
    } else {
      dispatch(video.actions.setCurrentVideo(playlistVideo));
      dispatch(video.actions.setIsPlaying(true));
    }
  };

  const image = youtubeAPI.videoKeyToThumbnailURL(playlistVideo.key);

  return (
    <ListItem selected={selected} button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar variant="square" src={image} />
      </ListItemAvatar>
      <ListItemText
        primary={playlistVideo.name}
        secondary={playlistVideo.type}
      />
      <ListItemSecondaryAction>
        {isPlaying && currentVideo?.key === playlistVideo.key ? (
          <PauseIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
