import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getTmdbMovieReviews, queryKeys } from "../../tmdb/query";
import TmdbReview from "./TmdbReview";

export default ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  const query = useQuery(queryKeys.movieReviews(tmdbMediaId), () =>
    getTmdbMovieReviews({ tmdbMediaId })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox p={6} />;
  }

  const reviews = query.data;

  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">{reviews.results.length} Reviews</Typography>
      </Box>
      {reviews.results.map((review, index) => (
        <Box key={review.id}>
          <TmdbReview key={review.id} review={review} p={2} marginY={2} />
        </Box>
      ))}
    </React.Fragment>
  );
};
