import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import AspectRatio from "../../common/components/AspectRatio";
import useVideoState from "./useVideoState";
import { videoKeyToEmbedURL } from "../youtube/query";
import { MovieVideo, MovieVideos } from "../tmdb/types";

const useStyles = makeStyles(() => ({
  videoContainer: {
    backgroundImage: ({ light }: ReactPlayerProps) => `url(${light})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
}));

export default ({
  videos,
  ...props
}: { videos: MovieVideos } & ReactPlayerProps) => {
  const classes = useStyles(props);
  const videoState = useVideoState();

  const initialVideo =
    videos?.results?.find((video) => video.type === "Trailer") ??
    videos?.results?.[0];

  useEffect(() => {
    videoState.setCurrentVideo(initialVideo);
    return () => {
      videoState.setCurrentVideo(undefined);
    };
  }, [initialVideo]);

  const url = videoKeyToEmbedURL(
    videoState.currentVideo?.key ?? initialVideo?.key
  );

  return (
    <AspectRatio ratio={[16, 9]} className={classes.videoContainer}>
      {Boolean(videoState.currentVideo) && (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={true}
          playing={videoState.isPlaying}
          onPlay={() => {
            videoState.setIsPlaying(true);
            videoState.setError(undefined);
          }}
          onPause={() => {
            videoState.setIsPlaying(false);
          }}
          onError={(error) => {
            videoState.setError(error);
          }}
          {...props}
        />
      )}
    </AspectRatio>
  );
};
