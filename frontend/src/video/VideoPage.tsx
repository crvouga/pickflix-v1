import { List, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import MovieListItem from "../movie/components/MovieListItem";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import YoutubeSection from "../youtube/Section";
import CurrentVideoPlayer from "./CurrentVideoPlayer";
import PlaylistSection from "./PlaylistSection";
import { video } from "./redux/video";

export default () => {
  const currentVideo = useSelector(video.selectors.currentVideo);

  return (
    <React.Fragment>
      <NavigationBarTopLevel />

      <CurrentVideoPlayer />

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
