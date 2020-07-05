import React from "react";
import YoutubeCommentThread from "./YoutubeCommentThread";
import { Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default ({ commentThreads }) => {
  const classes = useStyles();
  const {
    kind,
    etag,
    nextPageToken,
    // pageInfo: { totalResults, resultsPerPage },
    items = [],
  } = commentThreads;

  return (
    <div className={classes.root}>
      {items.map((commentThread) => (
        <React.Fragment>
          <YoutubeCommentThread
            key={commentThread.id}
            commentThread={commentThread}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
