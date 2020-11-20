import { CardHeader, CardHeaderProps } from "@material-ui/core";
import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { toYear } from "../../person/utils";
import { useQueryMovie } from "../../tmdb/query";
import { MediaId } from "../../tmdb/types";
import MovieAvatar from "./MovieAvatar";

type Movie = {
  id: string;
  title: string;
  releaseDate?: string | null;
  posterPath?: string | null;
  backdropPath?: string | null;
};

export const MovieCardHeader = ({
  movie,
  ...props
}: CardHeaderProps & {
  movie: Movie;
}) => {
  const { title, releaseDate } = movie;

  const releaseYear = releaseDate ? toYear(releaseDate) : undefined;
  // console.log({ releaseYear });
  // const history = useHistory();
  // const handleClick = () => {
  //   history.push(`/movie/${id}`);
  // };

  return (
    <CardHeader
      avatar={<MovieAvatar movie={movie} />}
      title={title}
      subheader={releaseYear}
      {...props}
    />
  );
};

export const MovieCardHeaderContainer = ({
  mediaId,
  ...props
}: { mediaId: MediaId } & CardHeaderProps) => {
  const query = useQueryMovie({
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ListItemSkeleton avatarShape="rect" />;
  }

  return <MovieCardHeader movie={query.data} {...props} />;
};
