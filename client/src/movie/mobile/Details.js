import { Grid, Typography, useTheme } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import Chips from "../../common/Chips";
import * as utils from "../../utils";

import numeral from "numeral";
const commas = (_) => numeral(_).format("0,0");

export default ({ details }) => {
  const theme = useTheme();

  const budget = details.budget ? `$${commas(details.budget)}` : "-";
  const revenue = details.revenue ? `$${commas(details.revenue)}` : "-";
  const voteAverage =
    details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;
  const voteCount = `${commas(details.voteCount)} votes`;

  const releaseDate = details.releaseDate
    ? utils.numberDateToWordDate(details.releaseDate)
    : "-";

  const runtime = details.runtime
    ? utils.minutesToHoursAndMinutes(details.runtime)
    : "-";

  return (
    <React.Fragment>
      <Typography style={{ fontWeight: "bold" }}>Details</Typography>

      <Grid container>
        <Grid item xs>
          <Typography>Budget</Typography>
          <Typography gutterBottom color="textSecondary">
            {budget}
          </Typography>
        </Grid>

        <Grid item xs>
          <Typography>Revenue</Typography>
          <Typography gutterBottom color="textSecondary">
            {revenue}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <Typography>Vote Average</Typography>
          <Typography gutterBottom color="textSecondary">
            {voteAverage}
          </Typography>
        </Grid>

        <Grid item xs>
          <Typography>Vote Count</Typography>
          <Typography gutterBottom color="textSecondary">
            {voteCount}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <Typography>Release Date</Typography>
          <Typography gutterBottom color="textSecondary">
            {releaseDate}
          </Typography>
        </Grid>

        <Grid item xs>
          <Typography>Runtime</Typography>
          <Typography gutterBottom color="textSecondary">
            {runtime}
          </Typography>
        </Grid>
      </Grid>

      <Typography>Genres</Typography>
      <Chips
        chips={details.genres}
        getLabel={R.prop("name")}
        marginBottom={1}
      />

      <Typography>Production Companies</Typography>
      <Chips
        chips={details.productionCompanies}
        getLabel={R.prop("name")}
        marginBottom={1}
      />

      <Typography>Production Countries</Typography>
      <Chips
        chips={details.productionCountries}
        getLabel={R.prop("name")}
        marginBottom={1}
      />
    </React.Fragment>
  );
};
