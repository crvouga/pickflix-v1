import { Box } from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import ErrorBox from "../../common/components/ErrorBox";
import { MediaId } from "../../media/tmdb/types";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardCallToAction from "../../review/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import useReviewVoteValue from "../../review/card/useReviewVoteValue";
import useReviewForm from "../../review/form/review-form/useReviewForm";
import { getReviewsQueryKey, useQueryReviews } from "../../review/query";
import WithAuthentication from "../../user/auth/WithAuthentication";

type Props = {
  mediaId: MediaId;
};

export default ({ mediaId }: Props) => {
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm();
  const query = useQueryReviews({ mediaId });
  const reviewVoteValue = useReviewVoteValue(getReviewsQueryKey({ mediaId }));

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

  if (reviews.results.length === 0) {
    return (
      <Box p={2}>
        <WithAuthentication
          renderAuthenticated={() => (
            <ReviewCardCallToAction
              title="Be the first to leave a review!"
              onClick={() => {
                reviewForm.setReview({
                  mediaId,
                });
                reviewFormModal.open();
              }}
            />
          )}
          renderDefault={() => {
            const { open } = useModal("SignInCallToAction");
            return (
              <ReviewCardCallToAction
                title="Be the first to leave a review!"
                onClick={open}
              />
            );
          }}
        />
      </Box>
    );
  }

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
