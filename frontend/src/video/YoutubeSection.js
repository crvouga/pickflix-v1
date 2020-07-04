import { makeStyles, Typography, Box, Divider } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import YoutubeVideoDetails from "./YoutubeVideoDetails";
import YoutubeCommentThreads from "./YoutubeCommentThreads";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const renderNameNumberPair = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

export default ({ youtubeData }) => {
  const classes = useStyles();

  const { video, commentThreadList } = youtubeData;

  const snippet = R.pathOr({}, ["items", 0, "snippet"], video);
  const statistics = R.pathOr({}, ["items", 0, "statistics"], video);

  return (
    <div className={classes.root}>
      <YoutubeVideoDetails snippet={snippet} statistics={statistics} />
      <Divider />
      <Box p={2} fontWeight="bold">
        <Typography variant="h6">Top Comments</Typography>
      </Box>
      <YoutubeCommentThreads commentThreads={commentThreadList} />
      <Box paddingX={2} paddingY={1}>
        <Typography variant="subtitle2" color="textSecondary">
          video meta data message {video?.meta?.message}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          video cache expires{" "}
          {video?.meta?.expires
            ? moment(video?.meta?.expires).fromNow()
            : "idk"}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          comment thread list meta data message{" "}
          {commentThreadList?.meta?.message}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          comment thread list cache expires{" "}
          {commentThreadList?.meta?.expires
            ? moment(commentThreadList?.meta?.expires).fromNow()
            : "idk"}
        </Typography>
      </Box>
    </div>
  );
};
