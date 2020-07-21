import { Box, Divider } from "@material-ui/core";
import React from "react";
import MoviePosterScroll from "../components/PosterScroll";
import Keywords from "./Keywords";

export default ({ keywords, similar, recommendations }) => {
  if (
    recommendations.length === 0 &&
    similar.length === 0 &&
    keywords.length === 0
  ) {
    return null;
  }

  return (
    <React.Fragment>
      <Box paddingTop={2}>
        {recommendations?.length > 0 && (
          <MoviePosterScroll title="Recommendations" movies={recommendations} />
        )}
        {similar?.length > 0 && (
          <MoviePosterScroll title="Similar" movies={similar} />
        )}
        {keywords?.length > 0 && <Keywords keywords={keywords} />}
      </Box>
      <Divider />
    </React.Fragment>
  );
};
