import React from "react";
import YoutubeCommentThread from "./YoutubeCommentThread";
import { Divider, makeStyles, Box, Typography } from "@material-ui/core";

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
  if (items.length === 0) {
    return (
      <Box p={2} fontWeight="bold">
        <Typography align="center" color="textSecondary">
          No Comments
        </Typography>
      </Box>
    );
  }
  return (
    <div className={classes.root}>
      <Box p={2} fontWeight="bold">
        <Typography>Top Comments</Typography>
      </Box>
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
