import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import YoutubeCommentThread from "./CommentThread";
import { YoutubeCommentThreadList } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export interface Props {
  commentThreadList: YoutubeCommentThreadList;
}

export default ({ commentThreadList }: Props) => {
  const classes = useStyles();
  const {
    // kind,
    // etag,
    // nextPageToken,
    // pageInfo: { totalResults, resultsPerPage },
    items = [],
  } = commentThreadList;

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
      <Box p={2}>
        <Typography style={{ fontWeight: "bold" }}>Top Comments</Typography>
      </Box>
      {items.map((commentThread, i) => (
        <React.Fragment key={commentThread.id}>
          <YoutubeCommentThread commentThread={commentThread} />
          {items.length - 1 === i && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};
