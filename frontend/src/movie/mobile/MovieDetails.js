import { Grid, Link, Typography, useTheme } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import * as utils from "../../utils";

export default ({ details }) => {
  const theme = useTheme();

  const budget = details.budget
    ? `$${utils.numberToNumberWithCommas(details.budget)}`
    : "-";

  const revenue = details.revenue
    ? `$${utils.numberToNumberWithCommas(details.revenue)}`
    : "-";

  const voteAverage =
    details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;

  const voteCount =
    details.voteCount > 0
      ? `${utils.numberToNumberWithCommas(details.voteCount)} votes`
      : "No Votes";

  const genres =
    details.genres.length > 0
      ? R.join(" · ", R.pluck("name", details.genres))
      : "-";

  const releaseDate = details.releaseDate
    ? utils.numberDateToWordDate(details.releaseDate)
    : "-";

  const runtime = details.runtime
    ? utils.minutesToHoursAndMinutes(details.runtime)
    : "-";

  const productionCountries =
    details.productionCountries.length > 0
      ? R.join(" · ", R.pluck("name", details.productionCountries))
      : "-";

  const productionCompanies =
    details.productionCompanies.length > 0
      ? R.join(" · ", R.pluck("name", details.productionCompanies))
      : "-";

  return (
    <div style={{ padding: theme.spacing(1), paddingBottom: theme.spacing(4) }}>
      <Typography gutterBottom align="center" style={{ fontWeight: "bold" }}>
        {details.tagline}
      </Typography>
      <Typography
        style={{ paddingBottom: theme.spacing(3) }}
        variant="body1"
        color="textSecondary"
      >
        {details.overview}
      </Typography>

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
      <Typography gutterBottom color="textSecondary">
        {genres}
      </Typography>

      <Typography>Production Companies</Typography>
      <Typography gutterBottom color="textSecondary">
        {productionCompanies}
      </Typography>

      <Typography>Production Countries</Typography>
      <Typography gutterBottom color="textSecondary">
        {productionCountries}
      </Typography>

      {/* <Link color="textSecondary" href={details.homepage}>
        {details.homepage ? "Home Page" : "-"}
      </Link> */}
    </div>
  );
};
