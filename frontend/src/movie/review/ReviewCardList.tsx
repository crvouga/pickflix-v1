import React from "react";
import { MediaId } from "../../media/tmdb/types";
import { ReviewCardGridContainer } from "../../review/card/ReviewCardGrid";

export default ({ mediaId }: { mediaId: MediaId }) => {
  return (
    <ReviewCardGridContainer
      ItemProps={{ xs: 12 }}
      ReviewCardProps={{ showMedia: false, showAuthor: true }}
      GetReviewParams={{ mediaId }}
    />
  );
};
