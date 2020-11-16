import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ReviewCardSkeleton from "../../reviews/card/ReviewCardSkeleton";
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
    return (
      <React.Fragment>
        {[...Array(3)].map((_, index) => (
          <Box key={index} paddingX={2} paddingY={1}>
            <ReviewCardSkeleton showAuthor iconButtonCount={1} />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const commentThreadList = query.data;

  return <CommentThreadList commentThreadList={commentThreadList} />;
};
