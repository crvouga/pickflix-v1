import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getReviews, queryKeys } from "../../reviews/query";
import { TmdbMediaType } from "../../tmdb/types";
import ReviewCard from "../../reviews/ReviewCard";

type Props = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export default (props: Props) => {
  const query = useQuery(queryKeys.reviews(props), () => getReviews(props));

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox p={6} />;
  }

  const reviews = query.data;

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <Box paddingX={2} paddingY={1}>
          <ReviewCard showUser review={review} />
        </Box>
      ))}
    </React.Fragment>
  );
};
