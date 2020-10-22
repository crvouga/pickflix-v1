import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import { TmdbMediaType } from "../tmdb/types";
import { useQueryReviews } from "./query/hooks";
import Review from "./Review";

type Props = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export default (props: Props) => {
  const query = useQueryReviews(props);

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const reviews = query.data;

  return (
    <div>
      {reviews.map((review) => (
        <Box>
          <Review {...review} />
        </Box>
      ))}
    </div>
  );
};
