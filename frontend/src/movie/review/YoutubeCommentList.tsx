import { Box } from "@material-ui/core";
import React from "react";
import LoadingBox from "../../common/components/LoadingBox";
import NothingHere from "../../common/components/NothingHere";
import CommentThread from "../../media/youtube/CommentThread";
import { useQueryYoutubeVideoCommentThreadList } from "../../media/youtube/query";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import InfiniteScrollBottom from "../../common/components/InfiniteScrollBottom";

const YoutubeCommentList = ({ videoId }: { videoId: string }) => {
  const query = useQueryYoutubeVideoCommentThreadList({ videoId });

  if (query.error) {
    return <NothingHere />;
  }

  if (query.data === undefined) {
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

  const items = query.data.flatMap((page) => page.items);

  if (items.length === 0) {
    return <NothingHere />;
  }

  return (
    <React.Fragment>
      {items.map((commentThread) => (
        <Box key={commentThread.id} paddingX={2} paddingY={1}>
          <CommentThread commentThread={commentThread} />
        </Box>
      ))}
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};

export default ({ videoId }: { videoId?: string }) => {
  if (videoId) {
    return <YoutubeCommentList videoId={videoId} />;
  }

  return <NothingHere />;
};
