import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import * as youtubeAPI from "./api";
import CommentThreadList from "./components/CommentThreadList";
import Details from "./components/Details";

const Loading = () => (
  <Box color="text.secondary" textAlign="center" marginY={5}>
    <CircularProgress color="inherit" disableShrink size="2em" />
  </Box>
);

const DetailsContainer = ({ videoId }) => {
  const query = useQuery(
    ["details", videoId],
    () => youtubeAPI.details({ videoId }),
    {}
  );

  if (query.status === "loading") {
    return <Loading />;
  }

  if (query.status === "error") {
    return "error";
  }

  const snippet = query.data?.items?.[0]?.snippet || {};
  const statistics = query.data?.items?.[0]?.statistics || {};

  return <Details snippet={snippet} statistics={statistics} />;
};

const CommentThreadListContainer = ({ videoId }) => {
  const query = useQuery(
    ["commentThreadList", videoId],
    () => youtubeAPI.commentThreadList({ videoId }),
    {}
  );

  if (query.status === "loading") {
    return <Loading />;
  }

  if (query.status === "error") {
    return "error";
  }

  const commentThreadList = query.data;

  return <CommentThreadList commentThreadList={commentThreadList} />;
};

export default ({ videoId }) => {
  return (
    <React.Fragment>
      <DetailsContainer videoId={videoId} />
      <CommentThreadListContainer videoId={videoId} />
    </React.Fragment>
  );
};
