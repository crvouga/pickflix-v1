import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { video } from "../../video/redux/video";

import { MovieVideos } from "../../tmdb/types";
type Props = {
  videos: MovieVideos;
};

export default (props: Props) => {
  const { videos } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickWatchTailer = () => {
    dispatch(video.actions.setPlaylist(videos.results));
    const trailer = videos.results.find((video) => video.type === "Trailer");
    dispatch(video.actions.setCurrentVideo(trailer || videos.results[0]));
    history.push("/video");
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<YouTubeIcon />}
      size="large"
      onClick={handleClickWatchTailer}
      disabled={videos.results.length === 0}
      style={{ fontWeight: "bold" }}
    >
      {videos.results.length === 0 ? "No Trailers" : "Watch Trailer"}
    </Button>
  );
};
