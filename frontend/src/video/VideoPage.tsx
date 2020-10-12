import { makeStyles, Paper, List } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import AspectRatio from "../common/components/AspectRatio";
import { actions, selectors } from "../redux";
import * as youtubeAPI from "../youtube/api";
import YoutubeSection from "../youtube/Section";
import PlaylistSection from "./PlaylistSection";
import { VideoProgress } from "./redux/types";
import MovieListItem from "../movie/components/MovieListItem";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";

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
  const isPlaying = useSelector(selectors.video.isPlaying);
  const video = useSelector(selectors.video.video);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(actions.video.play());
  };

  const handlePause = () => {
    dispatch(actions.video.pause());
  };

  const handleProgress = (progress: VideoProgress) => {
    dispatch(actions.video.progress(progress));
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
          url={youtubeAPI.videoKeyToEmbedURL(video?.key)}
          config={{
            youtube: youtubeAPI.embedConfig,
          }}
        />
      </AspectRatio>

      <Paper>
        <PlaylistSection />
      </Paper>

      {video?.tmdbMedia && (
        <List>
          <MovieListItem movie={video?.tmdbMedia?.tmdbData} />
        </List>
      )}

      {video?.key && <YoutubeSection videoId={video.key} />}
    </React.Fragment>
  );
};
