import {
  Box,
  Divider,
  Typography,
  TypographyProps,
  BoxProps,
} from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { MovieRecommendations, MovieSimilar } from "../../tmdb/types";
import Poster from "../components/Poster";

const Title = (props: TypographyProps & BoxProps) => (
  <Typography
    component={Box}
    paddingLeft={2}
    paddingBottom={1}
    style={{ fontWeight: "bold" }}
    {...props}
  />
);

interface Props {
  similar: MovieSimilar;
  recommendations: MovieRecommendations;
}

export default ({ similar, recommendations }: Props) => {
  if (recommendations.results.length === 0 && similar.results.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Box paddingTop={2}>
        {recommendations?.results.length > 0 && (
          <React.Fragment>
            <Title>Recommendations</Title>
            <HorizontalScroll paddingLeft={2} marginBottom={2}>
              {recommendations.results.map((movie) => (
                <Poster key={movie.id} movie={movie} marginRight={1} />
              ))}
            </HorizontalScroll>
          </React.Fragment>
        )}

        {similar?.results.length > 0 && (
          <React.Fragment>
            <Title>Similar</Title>
            <HorizontalScroll paddingLeft={2} marginBottom={2}>
              {similar.results.map((movie) => (
                <Poster key={movie.id} movie={movie} marginRight={1} />
              ))}
            </HorizontalScroll>
          </React.Fragment>
        )}
      </Box>
      <Divider />
    </React.Fragment>
  );
};
