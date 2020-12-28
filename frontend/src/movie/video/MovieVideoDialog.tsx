import { DialogProps } from "@material-ui/core";
import React from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import { closeModal } from "../../common/utility";
import useVideoState from "../../media/video/useVideoState";
import { MovieVideoList } from "./VideoListItem";

export default (props: DialogProps) => {
  const videoState = useVideoState();

  return (
    <ResponsiveDialog {...props} showDoneButton>
      <MovieVideoList
        selectedVideo={videoState.currentVideo}
        videos={videoState.playlist}
        onClick={(video) => {
          videoState.selectVideo(video);
          closeModal(props);
        }}
      />
    </ResponsiveDialog>
  );
};
