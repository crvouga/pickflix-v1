import React from "react";
import { useQuery } from "react-query";
import { queryKeys, getUsersReviews } from "./query";
import LoadingBox from "../common/components/LoadingBox";
import { Box, Typography, Card } from "@material-ui/core";
import { ReviewAggergation } from "./query/types";
import AvatarUser from "../auth/AvatarUser";
import MovieListItem from "../movie/components/MovieListItem";
import { Rating } from "@material-ui/lab";
import MoviePosterCard from "../movie/components/MoviePosterCard";

type Props = {
  username: string;
};

const Review = ({ review }: { review: ReviewAggergation }) => {
  return (
    <Card>
      <Box display="flex">
        <Box width="100px">
          <MoviePosterCard movie={review.tmdbData} />
        </Box>
        <Box p={2}>
          <Typography>
            {new Date(review.review.createdAt).toDateString()}
          </Typography>
          <Rating value={review.review.rating} readOnly />
          <Typography>{review.review.content}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ({ username }: Props) => {
  const query = useQuery(queryKeys.usersReviews({ username }), () =>
    getUsersReviews({ username })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox m={6} />;
  }

  const reviews = query.data;

  return (
    <Box>
      {reviews.map((review) => (
        <Box key={review.review.id} p={1}>
          <Review review={review} />
        </Box>
      ))}
    </Box>
  );
};
