import { Divider, Box } from "@material-ui/core";
import React from "react";
import YoutubeCommentThread from "./CommentThread";
import { YoutubeCommentThreadListResponse } from "./query/youtube-comment-types";

type Props = {
  commentThreadList: YoutubeCommentThreadListResponse;
};

export default ({ commentThreadList }: Props) => {
  const { items = [] } = commentThreadList;

  return (
    <React.Fragment>
      {items.map((commentThread, i) => (
        <Box key={commentThread.id} paddingX={2} paddingY={1}>
          <YoutubeCommentThread commentThread={commentThread} />
        </Box>
      ))}
    </React.Fragment>
  );
};
