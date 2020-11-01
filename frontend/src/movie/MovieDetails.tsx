import { Box, Divider, List, Typography } from "@material-ui/core";
import React from "react";
import * as R from "remeda"; // tree-shaking supported!
import { MovieCreditCrew } from "../tmdb/types";
import ActionBarSection from "./legacy/ActionBarSection";
import CreditsListItem from "./credits/CreditsListItem";
import { MoviePageData } from "./data";
import {
  SMALL_DOT,
  toBudget,
  toCertification,
  toReleaseYear,
  toRevenue,
  toRuntime,
  toGenres,
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

export default ({ data }: { data: MoviePageData }) => {
  const subtitle = [
    toCertification(data),
    toReleaseYear(data),
    toGenres(data),
    toRuntime(data),
  ]
    .filter((_) => _)
    .join(` ${SMALL_DOT} `);

  return (
    <Box>
      <Box p={2}>
        <Typography variant="h4">{data.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      </Box>

      <Divider />

      <ActionBarSection tmdbMediaId={data.id} />

      <Divider />

      <Box p={2}>
        <Typography align="center" variant="h6">
          {data.tagline}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {data.overview}
        </Typography>
      </Box>

      <BudgetRevenue budget={data.budget} revenue={data.revenue} />
    </Box>
  );
};
