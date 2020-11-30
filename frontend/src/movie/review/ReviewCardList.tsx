import { Box } from "@material-ui/core";
import React from "react";
import { MediaId } from "../../media/tmdb/types";
import { ReviewCardGridContainer } from "../../review/card/ReviewCardGridContainer";

export default ({ mediaId }: { mediaId: MediaId }) => {
  return (
    <Box paddingX={2}>
      <ReviewCardGridContainer
        ItemProps={{ xs: 12 }}
        ReviewCardProps={{ showMedia: false, showAuthor: true }}
        GetReviewParams={{ mediaId }}
      />
    </Box>
  );
};
