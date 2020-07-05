import { Box, makeStyles, Typography, Divider } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import React from "react";
import MovieReview from "../MovieReview";

const useStyles = makeStyles((theme) => ({
  review: {
    marginBottom: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const nameNumberPairToComponent = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

export default ({ reviews }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ textAlign: "left", display: "flex", flex: 1 }}>
        <CommentIcon className={classes.icon} />
        <Typography noWrap style={{ flex: 1 }}>
          {reviews.results.length === 0
            ? "Reviews"
            : nameNumberPairToComponent(["Reviews", reviews.results.length])}
        </Typography>
      </div>
      {reviews.results.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No Reviews
        </Typography>
      ) : (
        <div>
          {reviews.results.map((review, index) => (
            <React.Fragment>
              <MovieReview key={review.id} review={review} collapsible />
              <Divider />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
