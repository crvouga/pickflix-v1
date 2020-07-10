import React from "react";
import { useDispatch } from "react-redux";
import modal from "../../../common/redux/modal";
import OpenVideosButton from "../../../video/OpenVideosButton";
import player from "../../../video/redux/player";
import ThumbnailScroll from "../../../youtube/ThumbnailScroll";

export default ({ videos }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(player.actions.setPlaylist(videos));
    dispatch(modal.actions.open("videoModal"));
  };

  const handleThumbnailClick = (video) => () => {
    dispatch(player.actions.setVideo(video));
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
    </React.Fragment>
  );
};
