import {
  Button,
  CircularProgress,
  Collapse,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import * as R from "ramda";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExpandIcon from "../../common/ExpandIcon";

const useStyles = makeStyles((theme) => ({
  review: {
    marginBottom: theme.spacing(2),
  },
}));

const cutoffHeight = 120;

const getReviewHeight = (review) =>
  R.propOr(0, "clientHeight", document.getElementById(review.id));

const Review = ({ isCollapsed, toggleCollapse, review }) => {
  const classes = useStyles();

  return (
    <div className={classes.review}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="subtitle2"
          color="textSecondary"
          style={{ flex: 1 }}
        >
          Written by {review.author}
        </Typography>
        <Link color="inherit" href={review.url}>
          <LaunchIcon fontSize="small" />
        </Link>
      </div>
      <Collapse in={isCollapsed} collapsedHeight={cutoffHeight}>
        <ReactMarkdown id={review.id}>{review.content}</ReactMarkdown>
      </Collapse>
      <Button fullWidth variant="text" onClick={toggleCollapse}>
        <ExpandIcon expanded={isCollapsed} />
      </Button>
    </div>
  );
};

export default () => {
  const { id } = useParams();
  const reviewsQuery = useQuery(
    ["movies", id, "reviews"],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const reviews = R.pathOr([], ["data", "results"], reviewsQuery);
  const classes = useStyles();
  const [isCollapsedById, setIsCollapsedById] = useState({});
  const isCollapsed = (review) => R.propOr(false, review.id, isCollapsedById);
  const handleToggleCollapse = (review) => {
    setIsCollapsedById((_) =>
      R.assoc(review.id, R.not(R.propOr(false, review.id, _)), _)
    );
  };

  if (reviewsQuery.status !== "success") {
    return <CircularProgress color="secondary" />;
  }

  return (
    <div className={classes.root}>
      {reviews.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No Reviews
        </Typography>
      ) : (
        <div>
          {reviews.map((review) => (
            <Review
              key={review.id}
              isCollapsed={isCollapsed(review)}
              toggleCollapse={() => handleToggleCollapse(review)}
              review={review}
            />
          ))}
        </div>
      )}
    </div>
  );
};
