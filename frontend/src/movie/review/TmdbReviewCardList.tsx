import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getTmdbMovieReviews, queryKeys } from "../../tmdb/query";
import TmdbReviewCard from "./TmdbReviewCard";
import { MediaId } from "../../tmdb/types";
import { ReviewCardSkeleton } from "../../reviews/ReviewCard";

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
            <ReviewCardSkeleton showUser />
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
