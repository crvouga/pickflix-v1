import { Box, Chip, Divider, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import numeral from "numeral";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
momentDurationFormatSetup(moment);

const commas = (_) => numeral(_).format("0,0");

const renderChipScroll = (title, chips) => {
  if (chips.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <Box component={Typography} paddingLeft={2}>
        {title}
      </Box>
      <HorizontalScroll paddingLeft={2} marginBottom={2}>
        {chips.map((chip) => (
          <Box key={chip.name} marginRight={1} marginBottom={1}>
            <Chip clickable label={chip.name} variant="outlined" />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

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
    <Box>
      <Box p={2} paddingBottom={0}>
        <Box paddingBottom={2}>
          <Typography style={{ fontWeight: "bold" }}>Details</Typography>
        </Box>

        <Grid container spacing={2}>
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

        <Grid container spacing={2}>
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

        <Grid container spacing={2}>
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
      <Divider />
    </Box>
  );
};
