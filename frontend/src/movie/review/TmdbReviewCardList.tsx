import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import ReviewCardSkeleton from "../../reviews/card/ReviewCardSkeleton";
import { getTmdbMovieReviews, queryKeys } from "../../tmdb/query";
import { MediaId } from "../../tmdb/types";
import TmdbReviewCard from "./TmdbReviewCard";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQuery(queryKeys.movieReviews({ mediaId }), () =>
    getTmdbMovieReviews({ mediaId })
  );

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

  const reviews = query.data.results;

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <Box key={review.id} paddingX={2} paddingY={1}>
          <TmdbReviewCard review={review} />
        </Box>
      ))}
    </React.Fragment>
  );
};
