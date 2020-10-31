import { Divider } from "@material-ui/core";
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
        <React.Fragment key={commentThread.id}>
          <YoutubeCommentThread commentThread={commentThread} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
