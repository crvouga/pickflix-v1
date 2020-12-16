import { Box, Typography, TypographyProps } from "@material-ui/core";
import { descend, sort } from "ramda";
import React from "react";
import { useHistory } from "react-router";
import { DiscoverTags } from "../../discover/components/DiscoverTags";
import { IDiscoverTag, TagType } from "../../discover/query/types";
import useDiscoverState from "../../discover/redux/useDiscoverState";
import {
  MovieCredit,
  MovieCredits,
  MovieDetails,
  MovieReleaseDates,
} from "../../media/tmdb/types";

type Props = {
  details: MovieDetails;
  credits: MovieCredits;
  releaseDates: MovieReleaseDates;
};

const Subtitle = (props: TypographyProps) => {
  return (
    <Box paddingX={2}>
      <Typography variant="subtitle1" {...props} />
    </Box>
  );
};

const creditToWithPeopleTag = (credit: MovieCredit): IDiscoverTag => ({
  ...credit,
  type: TagType.withPeople,
});

const creditsToPeopleTags = (credits: MovieCredits): IDiscoverTag[] =>
  sort(
    descend((credit) => credit.popularity || 0),
    [...credits.crew, ...credits.cast]
  )
    .map(creditToWithPeopleTag)
    .slice(0, 100);

const detailsToGenreTags = (details: MovieDetails): IDiscoverTag[] =>
  details.genres.map((genre) => ({
    ...genre,
    type: TagType.withGenres,
  }));

const detailsToCompanyTags = (details: MovieDetails): IDiscoverTag[] =>
  details.productionCompanies.map((company) => ({
    ...company,
    type: TagType.withCompanies,
  }));

export default (props: Props) => {
  const { setActiveTagsById } = useDiscoverState();
  const history = useHistory();
  const handleClick = (tag: IDiscoverTag) => {
    setActiveTagsById({ [tag.id]: tag });
    history.push("/discover");
  };

  const { credits, details } = props;
  const peopleTags = creditsToPeopleTags(credits);
  const genreTags = detailsToGenreTags(details);
  const companyTags = detailsToCompanyTags(details);

  if (
    peopleTags.length === 0 &&
    genreTags.length === 0 &&
    companyTags.length === 0
  ) {
    return null;
  }

  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">Discover</Typography>
      </Box>
      {peopleTags.length > 0 && (
        <React.Fragment>
          <Subtitle>People</Subtitle>
          <DiscoverTags tags={peopleTags} onClick={handleClick} />
        </React.Fragment>
      )}
      {genreTags.length > 0 && (
        <React.Fragment>
          <Subtitle>Genres</Subtitle>
          <DiscoverTags tags={genreTags} onClick={handleClick} />
        </React.Fragment>
      )}
      {companyTags.length > 0 && (
        <React.Fragment>
          <Subtitle>Companies</Subtitle>
          <DiscoverTags tags={companyTags} onClick={handleClick} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
