import { Box } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { TmdbMedia } from "../../tmdb/types";
import { useMoviePageQuery } from "../data";
import WatchVideosButton from "./WatchVideosButton";

export default () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();

  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { videos, ...details } = query.data;

  const tmdbMedia: TmdbMedia = {
    tmdbMediaType: "movie",
    tmdbMediaId: tmdbMediaId,
    tmdbData: details,
  };

  const videosWithMovieData = {
    ...videos,
    results: videos.results.map((video) => ({
      ...video,
      tmdbMedia,
    })),
  };

  return (
    <Box paddingX={2}>
      <WatchVideosButton videos={videosWithMovieData} />
    </Box>
  );
};
