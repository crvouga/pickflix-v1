import React from "react";
import YoutubeComment from "./YoutubeComment";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  },
}));

export default ({ commentThread }) => {
  const {
    kind,
    etag,
    id,
    snippet: {
      channelId,
      videoId,
      topLevelComment,
      canReply,
      totalReplyCount,
      isPublic,
    },
  } = commentThread;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <YoutubeComment comment={topLevelComment} />
    </div>
  );
};
