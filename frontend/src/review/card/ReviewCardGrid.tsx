import { Grid, GridProps, Box, Typography } from "@material-ui/core";
import React from "react";
import LoadingBox from "../../common/components/LoadingBox";
import { useQueryReviews } from "../query";
import ReviewCardContainer from "./ReviewCardContainer";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import { ReviewCardProps } from "./ReviewCard";
import WithAuthentication from "../../user/auth/WithAuthentication";
import ReviewCardCallToAction from "./ReviewCardCallToAction";
import InfiniteScrollBottom from "../../common/hooks/InfiniteScrollBottom";

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

export const ReviewCardGridContainer = ({
  authorId,
  count,
  ItemProps = DEFAULT_ITEM_PROPS,
  limit,
  renderOverLimit,
  ReviewCardProps = DEFAULT_REVIEW_CARD_PROPS,
}: {
  ItemProps?: GridProps;
  limit?: number;
  renderOverLimit?: () => React.ReactNode;
  authorId: string;
  count: number;
  ReviewCardProps?: Partial<ReviewCardProps>;
}) => {
  const query = useQueryReviews({
    authorId,
  });

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return (
      <ReviewCardGridSkeleton
        {...ReviewCardProps}
        ItemProps={ItemProps}
        count={count}
      />
    );
  }

  const reviews = query.data.flatMap((page) => page.results);

  if (reviews.length === 0) {
    return (
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          authorId === currentUser.user.id ? (
            <ReviewCardCallToAction />
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
