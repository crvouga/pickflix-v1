import { Grid, GridProps, Box, Typography } from "@material-ui/core";
import React from "react";
import LoadingBox from "../../common/components/LoadingBox";
import { useQueryReviews, GetReviewsParams } from "../query";
import ReviewCardContainer from "./ReviewCardContainer";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import { ReviewCardProps } from "./ReviewCard";
import WithAuthentication from "../../user/auth/WithAuthentication";
import ReviewCardCallToAction, {
  ReviewCardCallToActionProps,
} from "./ReviewCardCallToAction";
import InfiniteScrollBottom from "../../common/hooks/InfiniteScrollBottom";
import useReviewForm from "../form/review-form/useReviewForm";
import { useListener } from "../../common/utility";
import { queryCache, useQueryCache } from "react-query";

const DEFAULT_REVIEW_CARD_PROPS: Partial<ReviewCardProps> = {
  showMedia: true,
};

const DEFAULT_ITEM_PROPS: GridProps = {
  xs: 12,
  sm: 6,
  md: 4,
};

export const ReviewCardGridEmpty = () => {
  return (
    <Box m={6}>
      <Typography align="center" variant="h6" color="textSecondary">
        No Reviews
      </Typography>
    </Box>
  );
};
export const ReviewCardGridSkeleton = ({
  ItemProps = DEFAULT_ITEM_PROPS,
  ReviewCardProps = DEFAULT_REVIEW_CARD_PROPS,
  count,
}: {
  ReviewCardProps?: Partial<ReviewCardProps>;
  ItemProps?: GridProps;
  count: number;
}) => {
  return (
    <Grid container spacing={1}>
      {[...Array(count)].map((_, index) => (
        <Grid key={index} item {...ItemProps}>
          <ReviewCardSkeleton {...ReviewCardProps} />
        </Grid>
      ))}
    </Grid>
  );
};

type ReviewCardGridContainerProps = {
  ItemProps?: GridProps;
  limit?: number;
  renderOverLimit?: () => React.ReactNode;
  ReviewCardProps?: Partial<ReviewCardProps>;
  ReviewCardCallToActionProps?: ReviewCardCallToActionProps;
  count?: number;
  GetReviewParams: GetReviewsParams;
};

export const ReviewCardGridContainer = ({
  GetReviewParams,
  count,
  ItemProps = DEFAULT_ITEM_PROPS,
  limit,
  renderOverLimit,
  ReviewCardProps = DEFAULT_REVIEW_CARD_PROPS,
  ReviewCardCallToActionProps,
}: ReviewCardGridContainerProps) => {
  const reviewForm = useReviewForm();
  const query = useQueryReviews(GetReviewParams);

  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    query.refetch();
  });

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return (
      <ReviewCardGridSkeleton
        {...ReviewCardProps}
        ItemProps={ItemProps}
        count={count || 0}
      />
    );
  }

  const reviews = query.data.flatMap((page) => page.results);

  if (reviews.length === 0) {
    return (
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          GetReviewParams.userId === currentUser.user.id ? (
            <ReviewCardCallToAction {...ReviewCardCallToActionProps} />
          ) : (
            <ReviewCardGridEmpty />
          )
        }
        renderDefault={() => <ReviewCardGridEmpty />}
      />
    );
  }

  if (limit) {
    const sliced = reviews.slice(0, limit);
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          {sliced.map((review) => (
            <Grid key={review.review.id} item {...ItemProps}>
              <ReviewCardContainer {...ReviewCardProps} review={review} />
            </Grid>
          ))}
        </Grid>
        {renderOverLimit && reviews.length > limit && renderOverLimit()}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {reviews.map((review) => (
          <Grid key={review.review.id} item {...ItemProps}>
            <ReviewCardContainer {...ReviewCardProps} review={review} />
          </Grid>
        ))}
      </Grid>
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
