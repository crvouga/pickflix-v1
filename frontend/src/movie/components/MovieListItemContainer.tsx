import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import MovieListItem from "./MovieListItem";
import { useQueryMovie } from "../../media/tmdb/query";
import { MediaId } from "../../media/tmdb/types";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryMovie({
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ListItemSkeleton avatarShape="rect" />;
  }

  return <MovieListItem movie={query.data} />;
};
