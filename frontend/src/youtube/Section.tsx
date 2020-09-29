import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import * as youtubeAPI from "./api";
import CommentThreadList from "./CommentThreadList";
import Details from "./Details";

const Error = () => null;

const Loading = () => (
  <Box color="text.secondary" textAlign="center" marginY={5}>
    <CircularProgress color="inherit" disableShrink size="2em" />
  </Box>
);

interface Props {
  videoId: string;
}

const DetailsContainer = ({ videoId }: Props) => {
  const query = useQuery(
    ["details", videoId],
    () => youtubeAPI.details({ videoId }),
    {}
  );

  if (query.status === "loading") {
    return null;
  }

  if (query.status === "error") {
    return <Error />;
  }

  const snippet = query.data?.items?.[0]?.snippet || {};
  const statistics = query.data?.items?.[0]?.statistics || {};

  return <Details snippet={snippet} statistics={statistics} />;
};

const CommentThreadListContainer = ({ videoId }: Props) => {
  const query = useQuery(
    ["commentThreadList", videoId],
    () => youtubeAPI.commentThreadList({ videoId }),
    {}
  );

  if (query.status === "loading") {
    return <Loading />;
  }

  if (query.status === "error") {
    return <Error />;
  }

  const commentThreadList = query.data;

  return <CommentThreadList commentThreadList={commentThreadList} />;
};

export default ({ videoId }: Props) => {
  return (
    <React.Fragment>
      <DetailsContainer videoId={videoId} />
      <CommentThreadListContainer videoId={videoId} />
    </React.Fragment>
  );
};
