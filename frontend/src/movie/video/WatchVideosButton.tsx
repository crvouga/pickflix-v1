import { Button } from "@material-ui/core";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import { MovieVideos } from "../../tmdb/types";

type Props = {
  videos: MovieVideos;
};

export default (props: Props) => {
  const { videos } = props;

  const dispatch = useDispatch();

  const handleClickWatchTailer = () => {
    dispatch(actions.video.setPlaylist(videos.results));
    dispatch(actions.router.push({ pathname: "/video" }));
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<PlayArrowOutlinedIcon />}
      size="large"
      onClick={handleClickWatchTailer}
      disabled={videos.results.length === 0}
      style={{ fontWeight: "bold" }}
    >
      {videos.results.length === 0 ? "No Trailers" : "Watch Trailer"}
    </Button>
  );
};
