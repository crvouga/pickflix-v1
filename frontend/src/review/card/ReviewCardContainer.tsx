import React from "react";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { GetReviewsParams } from "../query";
import useReviewActionsProps from "./review-actions/useReviewActionsProps";
import { useReviewVoteActionProps } from "../form/vote/review-vote-states";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";

export default ({
  ReviewCardProps,
}: {
  ReviewCardProps: ReviewCardProps;
  GetReviewsParams?: GetReviewsParams;
}) => {
  const { review } = ReviewCardProps;
  const { reviewActionProps } = useReviewActionsProps(review);
  const { reviewVoteActionProps } = useReviewVoteActionProps(review);

  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) =>
        review.review.authorId === currentUser.user.id ? (
          <ReviewCard
            {...ReviewCardProps}
            ReviewActionsProps={reviewActionProps}
            ReviewVoteActionProps={reviewVoteActionProps}
          />
        ) : (
          <ReviewCard
            {...ReviewCardProps}
            ReviewVoteActionProps={reviewVoteActionProps}
          />
        )
      }
      renderDefault={() => (
        <ReviewCard
          {...ReviewCardProps}
          ReviewVoteActionProps={reviewVoteActionProps}
        />
      )}
    />
  );
};
