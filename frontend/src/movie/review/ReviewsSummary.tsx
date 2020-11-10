import { Box, Typography, Container } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { getReviewStatistics, queryKeys } from "../../reviews/query";
import RatingDistributon from "../../reviews/RatingDistributon";
import { Rating } from "@material-ui/lab";
import numeral from "numeral";
import RatingAverage from "../../reviews/RatingAverage";
type Props = {
  tmdbMediaId: string;
};

export default ({ tmdbMediaId }: Props) => {
  const query = useQuery(
    queryKeys.reviewStatistics({ tmdbMediaId, tmdbMediaType: "movie" }),
    () => getReviewStatistics({ tmdbMediaId, tmdbMediaType: "movie" })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const statistics = query.data;

  return (
    <React.Fragment>
      <Box width="100%" maxWidth="360px" p={2} display="flex">
        <Box width="66.66%">
          <RatingDistributon statistics={statistics} />
        </Box>
        <Box width="33.33%">
          <RatingAverage statistics={statistics} />
        </Box>
      </Box>
    </React.Fragment>
  );
};
