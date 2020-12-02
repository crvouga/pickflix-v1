import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import NothingHere from "../../common/components/NothingHere";
import InfiniteScrollBottom from "../../common/components/InfiniteScrollBottom";
import { useQueryTmdbReviews } from "../../media/tmdb/query";
import { MediaId } from "../../media/tmdb/types";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import TmdbReviewCard from "./TmdbReviewCard";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryTmdbReviews({
    mediaId,
  });

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(3)].map((_, index) => (
          <Box key={index} paddingX={2} paddingY={1}>
            <ReviewCardSkeleton showAuthor />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const reviews = query.data.flatMap((page) => page.results);

  if (reviews.length === 0) {
    return <NothingHere />;
  }

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <Box key={review.id} paddingX={2} paddingY={1}>
          <TmdbReviewCard review={review} />
        </Box>
      ))}
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
