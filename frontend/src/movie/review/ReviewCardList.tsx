import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getReviewsQueryKey, useQueryReviews } from "../../reviews/query";
import ReviewCard from "../../reviews/ReviewCard";
import useReviewVoteValueState from "../../reviews/useReviewVoteValueState";
import { MediaId } from "../../tmdb/types";

type Props = {
  mediaId: MediaId;
};

export default (props: Props) => {
  const query = useQueryReviews(props);
  const reviewVoteValueState = useReviewVoteValueState(
    getReviewsQueryKey(props)
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox p={6} />;
  }

  const reviews = query.data;

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <Box paddingX={2} paddingY={1} key={review.review.id}>
          <ReviewCard
            showUser
            review={review}
            onVoteDown={() => {
              reviewVoteValueState.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteValueState.voteUp(review);
            }}
          />
        </Box>
      ))}
    </React.Fragment>
  );
};
