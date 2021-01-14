import { useParams } from "react-router";
import { useQueryReviews } from "./query";

export default () => {
  const { reviewId } = useParams<{ reviewId: string }>();

  const query = useQueryReviews({
    id: reviewId,
  });

  if (query.error) {
  }

  return null;
};
