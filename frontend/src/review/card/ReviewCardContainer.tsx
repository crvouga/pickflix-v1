import React from "react";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { makeGetReviewsQueryKey } from "../query";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";
import useReviewActions from "./useReviewActions";
import useReviewVoteValue from "./useReviewVoteValue";

export default (props: ReviewCardProps) => {
  const { review } = props;
  const { onDelete, onEdit } = useReviewActions();

  const { voteUp, voteDown } = useReviewVoteValue(
    makeGetReviewsQueryKey({
      authorId: review.review.authorId,
    })
  );

  const ActionProps = {
    onDelete: () => {
      onDelete(review.review.id);
    },
    onEdit: () => {
      onEdit(review.review);
    },
  };

  const VoteProps = {
    onVoteUp: () => {
      voteUp(review);
    },
    onVoteDown: () => {
      voteDown(review);
    },
  };

  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) =>
        review.review.authorId === currentUser.user.id ? (
          <ReviewCard {...props} {...ActionProps} {...VoteProps} />
        ) : (
          <ReviewCard {...props} {...VoteProps} />
        )
      }
      renderDefault={() => <ReviewCard {...props} {...VoteProps} />}
    />
  );
};
