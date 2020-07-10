import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Review from "../../components/Review";
import Title from "./Title";

export default ({ reviews }) => {
  if (reviews.results.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Title p={2} paddingBottom={0}>
        {`Reviews `}
        <Box component="span" color="text.secondary">
          {reviews.results.length}
        </Box>
      </Title>

      {reviews.results.map((review, index) => (
        <React.Fragment key={review.id}>
          <Review
            key={review.id}
            review={review}
            collapsible
            p={2}
            marginY={2}
          />
          {index !== reviews.results.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
