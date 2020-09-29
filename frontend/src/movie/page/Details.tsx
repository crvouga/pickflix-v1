import { Box, Chip, Divider, Grid, Typography } from "@material-ui/core";
import moment from "moment";
// import momentDurationFormatSetup from "moment-duration-format";
import "moment-duration-format";
import numeral from "numeral";
import React from "react";
import { useDispatch } from "react-redux";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import discover from "../../discover/redux";
import { Tag as ITag } from "../../discover/redux/types";
import Tag from "../../discover/Tag";
import router from "../../redux/router";
import { MovieKeywords, MovieDetails } from "../../tmdb/types";

// momentDurationFormatSetup(moment);

const commas = (_: any) => numeral(_).format("0,0");

interface TagScrollProps {
  title: string;
  tags: ITag[];
}

const TagScroll = ({ title, tags }: TagScrollProps) => {
  const dispatch = useDispatch();

  if (tags.length === 0) {
    return null;
  }

  const onClick = (tag: ITag) => () => {
    dispatch(discover.actions.activateTags([tag]));
    dispatch(router.actions.push({ pathname: "/discover" }));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const renderChipScroll = (title: string, chips: { name: string }[]) => {
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

interface Props {
  details: MovieDetails;
  keywords: MovieKeywords;
}

export default ({ details, keywords }: Props) => {
  const budget = details.budget ? `$${commas(details.budget)}` : "-";

  const revenue = details.revenue ? `$${commas(details.revenue)}` : "-";

  const voteAverage =
    details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;

  const voteCount = `${commas(details.voteCount)} votes`;

  const releaseDate = moment(details.releaseDate).format("MMMM Do YYYY");

  const runtime = moment
    .duration(details.runtime, "minutes")
    .format("h[h] m[m]");

  const genreTags: ITag[] = details.genres.map((genre) => ({
    ...genre,
    type: "genre",
  }));
  const keywordTags: ITag[] = keywords.keywords.map((keyword) => ({
    ...keyword,
    type: "keyword",
  }));
  const companyTags: ITag[] = details.productionCompanies.map(
    (productionCompany) => ({
      ...productionCompany,
      type: "company",
    })
  );

  return (
    <Box paddingTop={2}>
      <TagScroll title="Genres" tags={genreTags} />
      <TagScroll title="Keywords" tags={keywordTags} />
      <TagScroll title="Production Companies" tags={companyTags} />
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
