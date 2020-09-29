import { Divider } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import { ModalName } from "../../redux/router/types";
import { MovieVideo } from "../../tmdb/types";
import OpenVideosButton from "../../video/OpenVideosButton";
import ThumbnailScroll from "../../youtube/ThumbnailScroll";

interface Props {
  videos: MovieVideo[];
}

export default ({ videos }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.video.setPlaylist(videos));
    dispatch(actions.router.open({ name: ModalName.VideoPlayer }));
  };

  const handleThumbnailClick = (video: MovieVideo) => {
    dispatch(actions.video.setVideo(video));
    handleClick();
  };

  return (
    <React.Fragment>
      <OpenVideosButton videos={videos} onClick={handleClick} />
      <ThumbnailScroll
        videos={videos}
        onClick={handleThumbnailClick}
        paddingX={2}
      />
      <Divider />
    </React.Fragment>
  );
};
