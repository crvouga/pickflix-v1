import React from "react";
import YoutubeComment from "./Comment";
import { YoutubeCommentThread } from "./query/types";

type Props = {
  commentThread: YoutubeCommentThread;
};

export default ({ commentThread }: Props) => {
  const {
    snippet: { topLevelComment },
  } = commentThread;

  return <YoutubeComment comment={topLevelComment} />;
};
