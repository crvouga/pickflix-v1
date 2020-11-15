import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ReviewStatistics } from "./query";
import { RATING_COLOR } from "./Rating";

const useStyles = makeStyles((theme) => ({
  borderRadius: {},

  bucket: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: theme.spacing(1),

    backgroundColor: theme.palette.grey[900],
  },

  bucketFill: {
    borderRadius: theme.spacing(1),
    backgroundColor: RATING_COLOR,
    height: "100%",
    width: ({ percentage }: { percentage: number }) => `${percentage * 100}%`,
  },
}));

export const RatingFrequencyBucket = (props: { percentage: number }) => {
  const classes = useStyles(props);

  return (
    <Box className={classes.bucket}>
      <Box className={classes.bucketFill} />
    </Box>
  );
};

export default ({ statistics }: { statistics?: ReviewStatistics }) => {
  return (
    <Box>
      {[5, 4, 3, 2, 1].map((rating) => (
        <Box
          key={rating}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box marginRight={2}>
            <Typography color="textSecondary">{rating}</Typography>
          </Box>
          <Box flex={1}>
            <RatingFrequencyBucket
              percentage={
                statistics
                  ? (statistics.ratingFrequency[rating] || 0) /
                    Math.max(statistics.ratingCount, 1)
                  : 0
              }
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
