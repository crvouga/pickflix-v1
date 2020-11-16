import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import { getReviewsQueryKey, useQueryReviews } from "../../reviews/query";
import ReviewCard from "../../reviews/card/ReviewCard";
import ReviewCardSkeleton from "../../reviews/card/ReviewCardSkeleton";
import useReviewVoteValue from "../../reviews/card/useReviewVoteValue";
import { MediaId } from "../../tmdb/types";

type Props = {
  mediaId: MediaId;
};

export default (props: Props) => {
  const query = useQueryReviews(props);
  const reviewVoteValue = useReviewVoteValue(getReviewsQueryKey(props));

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(3)].map((_, index) => (
          <Box paddingX={2} paddingY={1} key={index}>
            <ReviewCardSkeleton showAuthor iconButtonCount={2} />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const reviews = query.data;

  return (
    <React.Fragment>
      {reviews.results.map((review) => (
        <Box paddingX={2} paddingY={1} key={review.review.id}>
          <ReviewCard
            showAuthor
            review={review}
            onVoteDown={() => {
              reviewVoteValue.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteValue.voteUp(review);
            }}
          />
        </Box>
      ))}
    </React.Fragment>
  );
};
