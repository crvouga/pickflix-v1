import { Box, Grid, Typography, useTheme } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import numeral from "numeral";
import * as R from "ramda";
import React from "react";
import ChipScroll from "../../../common/components/ChipScroll";
momentDurationFormatSetup(moment);

const commas = (_) => numeral(_).format("0,0");

const renderChipScroll = (title, chips) => (
  <React.Fragment>
    <Box component={Typography} paddingLeft={2}>
      {title}
    </Box>
    <ChipScroll
      chips={chips}
      getLabel={R.prop("name")}
      paddingLeft={2}
      marginBottom={2}
    />
  </React.Fragment>
);

export default ({ details }) => {
  const budget = details.budget ? `$${commas(details.budget)}` : "-";
  const revenue = details.revenue ? `$${commas(details.revenue)}` : "-";
  const voteAverage =
    details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;
  const voteCount = `${commas(details.voteCount)} votes`;

  const releaseDate = moment(details.releaseDate).format("MMMM Do YYYY");
  const runtime = moment
    .duration(details.runtime, "minutes")
    .format("h[h] m[m]");

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={0}>
        <Box paddingBottom={2}>
          <Typography style={{ fontWeight: "bold" }}>Details</Typography>
        </Box>

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
      </Box>
      {renderChipScroll("Genres", details.genres)}
      {renderChipScroll("Production Companies", details.productionCompanies)}
      {renderChipScroll("Production Countries", details.productionCountries)}
    </React.Fragment>
  );
};
