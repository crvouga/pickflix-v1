import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import { getReviewsQueryKey, useQueryReviews } from "../../review/query";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import useReviewVoteValue from "../../review/card/useReviewVoteValue";
import { MediaId } from "../../media/tmdb/types";

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
