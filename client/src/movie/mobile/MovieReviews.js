import { Box, makeStyles, Typography, Divider } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import React from "react";
import MovieReview from "../MovieReview";

const useStyles = makeStyles((theme) => ({
  review: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const renderNameNumberPair = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

export default ({ reviews }) => {
  const classes = useStyles();

  if (reviews.results.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Box p={2}>
        <Typography style={{ fontWeight: "bold" }}>
          {`Reviews `}
          <Box component="span" color="text.secondary">
            {reviews.results.length}
          </Box>
        </Typography>
      </Box>
      {reviews.results.map((review, index) => (
        <React.Fragment>
          <MovieReview key={review.id} review={review} collapsible />
          {index !== reviews.results.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};
