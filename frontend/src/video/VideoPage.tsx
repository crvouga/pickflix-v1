import { List, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import AspectRatio from "../common/components/AspectRatio";
import MovieListItem from "../movie/components/MovieListItem";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import * as youtubeAPI from "../youtube/api";
import YoutubeSection from "../youtube/Section";
import PlaylistSection from "./PlaylistSection";
import { VideoProgress } from "./redux/video";
import { video } from "./redux/video";

const useStyles = makeStyles((theme) => ({
  playerContainer: {
    position: "sticky",
    top: 56,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
}));

export default () => {
  const classes = useStyles();
  const isPlaying = useSelector(video.selectors.isPlaying);
  const currentVideo = useSelector(video.selectors.currentVideo);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(video.actions.play());
  };

  const handlePause = () => {
    dispatch(video.actions.pause());
  };

  const handleProgress = (progress: VideoProgress) => {
    dispatch(video.actions.progress(progress));
  };

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <AspectRatio
        ratio={[16, 9]}
        ContainerProps={{ className: classes.playerContainer }}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          playing={isPlaying}
          url={youtubeAPI.videoKeyToEmbedURL(currentVideo?.key)}
          config={{
            youtube: youtubeAPI.embedConfig,
          }}
        />
      </AspectRatio>

      <Paper>
        <PlaylistSection />
      </Paper>

      {currentVideo?.tmdbMedia && (
        <List>
          <MovieListItem movie={currentVideo.tmdbMedia?.tmdbData} />
        </List>
      )}

      {currentVideo?.key && <YoutubeSection videoId={currentVideo.key} />}
    </React.Fragment>
  );
};
