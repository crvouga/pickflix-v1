import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import ReadMoreTypography from "../common/components/ReadMoreTypography";
import { MovieDetails, MovieReleaseDates } from "../tmdb/types";
import ActionBarSection from "./action-bar/ActionBarSection";
import {
  SMALL_DOT,
  toBudget,
  toCertification,
  toGenres,
  toReleaseYear,
  toRevenue,
  toRuntime,
} from "./utils";

const BudgetRevenue = ({
  budget,
  revenue,
}: {
  budget: number;
  revenue: number;
}) => {
  return Boolean(budget) || Boolean(revenue) ? (
    <Box display="flex" paddingX={2}>
      {Boolean(revenue) && (
        <Box flex={1}>
          <Typography>Box Office</Typography>
          <Typography color="textSecondary">
            {toRevenue({ revenue })}
          </Typography>
        </Box>
      )}
      {Boolean(budget) && (
        <Box flex={1}>
          <Typography>Budget</Typography>
          <Typography color="textSecondary"> {toBudget({ budget })}</Typography>
        </Box>
      )}
    </Box>
  ) : null;
};

export default ({
  details,
  releaseDates,
}: {
  details: MovieDetails;
  releaseDates: MovieReleaseDates;
}) => {
  const subtitle = [
    toCertification({ releaseDates }),
    toReleaseYear(details),
    toGenres(details),
    toRuntime(details),
  ]
    .filter((_) => _)
    .join(` ${SMALL_DOT} `);

  return (
    <Box>
      <Box p={2}>
        <Typography variant="h4">{details.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      </Box>

      <Divider />

      <ActionBarSection tmdbMediaId={details.id} />

      <Divider />

      <Box p={2}>
        <Typography align="center" variant="h6">
          {details.tagline}
        </Typography>
        <ReadMoreTypography
          variant="body1"
          color="textSecondary"
          gutterBottom
          ideal={250}
        >
          {details.overview}
        </ReadMoreTypography>
      </Box>

      <BudgetRevenue budget={details.budget} revenue={details.revenue} />
    </Box>
  );
};
