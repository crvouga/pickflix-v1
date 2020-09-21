import { Box, Chip, Divider, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import numeral from "numeral";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import * as R from "ramda";
import Tag from "../../discover/Tag";
import { useDispatch } from "react-redux";
import discover from "../../discover/redux";
import router from "../../redux/router";
momentDurationFormatSetup(moment);

const commas = (_) => numeral(_).format("0,0");

const TagScroll = ({ title, tags }) => {
  const dispatch = useDispatch();
  if (tags.length === 0) {
    return null;
  }
  const onClick = (tag) => () => {
    dispatch(discover.actions.activateTags([tag]));
    dispatch(router.actions.push("/discover"));
  };
  return (
    <>
      <Typography
        component={Box}
        gutterBottom
        style={{ fontWeight: "bold" }}
        paddingLeft={2}
      >
        {title}
      </Typography>
      <HorizontalScroll paddingLeft={2} marginBottom={2}>
        {tags.map((tag) => (
          <Box
            key={tag.id}
            marginRight={1}
            marginBottom={1}
            onClick={onClick(tag)}
          >
            <Tag tag={tag} />
          </Box>
        ))}
      </HorizontalScroll>
    </>
  );
};

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

export default ({ details, keywords }) => {
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
    <Box paddingTop={2}>
      <TagScroll
        title="Genres"
        tags={R.map(R.assoc("type", "genre"), details.genres)}
      />
      <TagScroll
        title="Keywords"
        tags={R.map(R.assoc("type", "keyword"), keywords)}
      />
      <TagScroll
        title="Production Companies"
        tags={R.map(R.assoc("type", "company"), details.productionCompanies)}
      />
      <Box paddingX={2}>
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

      {renderChipScroll("Production Countries", details.productionCountries)}
      <Divider />
    </Box>
  );
};
