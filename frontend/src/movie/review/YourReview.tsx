import { Box, Typography } from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import { useListener } from "../../common/utility";
import { MediaId } from "../../media/tmdb/types";
import { ReviewCardCallToAction } from "../../review/card/call-to-action/ReviewCardCallToAction";
import ReviewCardCallToActionContainer from "../../review/card/call-to-action/ReviewCardCallToActionContainer";
import ReviewCardContainer from "../../review/card/ReviewCardContainer";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import { eventEmitterReviewForm } from "../../review/form/edit-create-review/review-form";
import { useQueryReviews } from "../../review/query";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { UserAggergation } from "../../user/query";
import { eventEmitterReviewVoteForm } from "../../review/form/vote/review-vote-form";
import equals from "fast-deep-equal";

const YourReview = ({
  user,
  mediaId,
}: {
  user: UserAggergation;
  mediaId: MediaId;
}) => {
  const authorId = user.user.id;
  const query = useQueryReviews({
    authorId,
    mediaId,
  });
  useListener(eventEmitterReviewForm, "submitSuccess", () => {
    query.refetch();
  });
  useListener(eventEmitterReviewVoteForm, "submitSuccess", (review) => {
    if (equals(review.authorId, authorId) && equals(review.mediaId, mediaId)) {
      query.refetch();
    }
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ReviewCardSkeleton showAuthor iconButtonCount={1} />;
  }

  const reviews = query.data.flatMap((page) => page.results);

  if (reviews.length === 0) {
    return (
      <ReviewCardCallToActionContainer partialReview={{ mediaId: mediaId }} />
    );
  }

  const review = reviews[0];

  return (
    <ReviewCardContainer
      ReviewCardProps={{ showAuthor: true, review: review }}
    />
  );
};

export default ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("SignInCallToAction");

  return (
    <Box paddingX={2}>
      <Box paddingBottom={1}>
        <Typography variant="h6">Your Review</Typography>
      </Box>
      <WithAuthentication
        renderAuthenticated={(currentUser) => (
          <YourReview mediaId={mediaId} user={currentUser} />
        )}
        renderDefault={() => <ReviewCardCallToAction onClick={open} />}
      />
    </Box>
  );
};
