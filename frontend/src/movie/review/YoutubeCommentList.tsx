import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../../common/components/LoadingBox";
import CommentThreadList from "../../youtube/CommentThreadList";
import {
  getYoutubeVideoCommentThreadList,
  queryKeys,
} from "../../youtube/query";

export default ({ videoId }: { videoId?: string }) => {
  const query = useQuery(queryKeys.youtubeCommentThread({ videoId }), () =>
    videoId ? getYoutubeVideoCommentThreadList({ videoId }) : Promise.reject()
  );

  if (!videoId || query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox p={6} />;
  }

  const commentThreadList = query.data;

  return <CommentThreadList commentThreadList={commentThreadList} />;
};
