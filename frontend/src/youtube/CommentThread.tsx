import { makeStyles } from "@material-ui/core";
import React from "react";
import YoutubeComment from "./Comment";
import { YoutubeCommentThread } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  },
}));

interface Props {
  commentThread: YoutubeCommentThread;
}

export default ({ commentThread }: Props) => {
  const {
    // kind,
    // etag,
    // id,
    snippet: {
      // channelId,
      // videoId,
      topLevelComment,
      // canReply,
      // totalReplyCount,
      // isPublic,
    },
  } = commentThread;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <YoutubeComment comment={topLevelComment} />
    </div>
  );
};
