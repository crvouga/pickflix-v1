import { Box, Typography } from "@material-ui/core";
import React from "react";
import { MediaId } from "../../media/tmdb/types";
import { useQueryReviewStatistics } from "../../review/query";
import RatingAverage from "../../review/rating/RatingAverage";
import RatingDistributon from "../../review/rating/RatingDistributon";

type Props = {
  mediaId: MediaId;
};

export default ({ mediaId }: Props) => {
  const query = useQueryReviewStatistics({ mediaId });

  if (query.error) {
    return null;
  }

  const statistics = query.data;

  return (
    <Box width="100%" paddingX={2}>
      <Box paddingBottom={1}>
        <Typography variant="h6">Reviews Summary</Typography>
      </Box>
      <Box display="flex">
        <Box width="66.66%">
          <RatingDistributon statistics={statistics} />
        </Box>
        <Box width="33.33%">
          <RatingAverage statistics={statistics} />
        </Box>
      </Box>
    </Box>
  );
};
