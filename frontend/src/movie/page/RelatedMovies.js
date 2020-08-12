import { Box, Chip, Divider, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../components/Poster";
import HorizontalScroll from "../../common/components/HorizontalScroll";

const Title = (props) => (
  <Typography
    component={Box}
    paddingLeft={2}
    paddingBottom={1}
    style={{ fontWeight: "bold" }}
    {...props}
  />
);

export default ({ similar, recommendations }) => {
  if (recommendations.length === 0 && similar.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Box paddingTop={2}>
        {recommendations?.length > 0 && (
          <React.Fragment>
            <Title>Recommendations</Title>
            <HorizontalScroll paddingLeft={2} marginBottom={2}>
              {recommendations.map((movie) => (
                <Poster key={movie.id} movie={movie} marginRight={1} />
              ))}
            </HorizontalScroll>
          </React.Fragment>
        )}

        {similar?.length > 0 && (
          <React.Fragment>
            <Title>Similar</Title>
            <HorizontalScroll paddingLeft={2} marginBottom={2}>
              {similar.map((movie) => (
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
