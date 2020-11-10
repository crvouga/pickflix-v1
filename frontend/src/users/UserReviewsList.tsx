import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../common/components/LoadingBox";
import { getUsersReviews, queryKeys } from "../reviews/query";
import ReviewCard from "../reviews/ReviewCard";
import { User } from "./query";

export default ({ user }: { user: User }) => {
  const query = useQuery(queryKeys.usersReviews(user), () =>
    getUsersReviews(user)
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox m={6} />;
  }

  const reviews = query.data;

  if (reviews.length === 0) {
    return (
      <Box m={6}>
        <Typography color="textSecondary" align="center">
          No reviews
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {reviews.map((review) => (
        <Box key={review.review.id} paddingY={1} paddingBottom={2}>
          <ReviewCard showMedia review={review} />
        </Box>
      ))}
    </Box>
  );
};
