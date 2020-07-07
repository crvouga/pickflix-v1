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
      <YoutubeCommentThreads commentThreads={commentThreadList} />
    </div>
  );
};
