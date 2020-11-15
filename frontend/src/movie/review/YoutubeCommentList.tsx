import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../../common/components/LoadingBox";
import CommentThreadList from "../../youtube/CommentThreadList";
import {
  getYoutubeVideoCommentThreadList,
  queryKeys,
} from "../../youtube/query";
import { ReviewCardSkeleton } from "../../reviews/ReviewCard";

export default ({ videoId }: { videoId?: string }) => {
  const query = useQuery(queryKeys.youtubeCommentThread({ videoId }), () =>
    videoId ? getYoutubeVideoCommentThreadList({ videoId }) : Promise.reject()
  );

  if (!videoId || query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(3)].map((_, index) => (
          <Box key={index} paddingX={2} paddingY={1}>
            <ReviewCardSkeleton showUser iconButtonCount={1} />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const commentThreadList = query.data;

  return <CommentThreadList commentThreadList={commentThreadList} />;
};
