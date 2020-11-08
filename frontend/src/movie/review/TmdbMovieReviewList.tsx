import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getTmdbMovieReviews, queryKeys } from "../../tmdb/query";
import TmdbReview from "./TmdbReviewListItem";

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
      {reviews.results.map((review) => (
        <Box key={review.id} paddingX={2} paddingY={1}>
          <TmdbReview review={review} />
        </Box>
      ))}
    </React.Fragment>
  );
};
