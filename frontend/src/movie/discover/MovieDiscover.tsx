import { Box, Typography, TypographyProps } from "@material-ui/core";
import { descend, sort, uniqBy } from "ramda";
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
  MovieKeywords,
} from "../../media/tmdb/types";

type Props = {
  keywords: MovieKeywords;
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
  uniqBy(
    (tag) => tag.id,
    sort(
      descend((credit) => credit.popularity || 0),
      [...credits.crew, ...credits.cast]
    )
      .map(creditToWithPeopleTag)
      .slice(0, 100)
  );

const keywordsToWithKeywordsTags = (keywords: MovieKeywords): IDiscoverTag[] =>
  keywords.keywords.map((keyword) => ({
    type: TagType.withKeywords,
    ...keyword,
  }));

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

  const { credits, details, keywords } = props;
  const peopleTags = creditsToPeopleTags(credits);
  const genreTags = detailsToGenreTags(details);
  const companyTags = detailsToCompanyTags(details);
  const keywordTags = keywordsToWithKeywordsTags(keywords);

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
        <Box paddingBottom={2}>
          <Subtitle>People</Subtitle>
          <DiscoverTags tags={peopleTags} onClick={handleClick} />
        </Box>
      )}
      {genreTags.length > 0 && (
        <Box paddingBottom={2}>
          <Subtitle>Genres</Subtitle>
          <DiscoverTags tags={genreTags} onClick={handleClick} />
        </Box>
      )}
      {keywordTags.length > 0 && (
        <Box paddingBottom={2}>
          <Subtitle>Keywords</Subtitle>
          <DiscoverTags tags={keywordTags} onClick={handleClick} />
        </Box>
      )}
      {companyTags.length > 0 && (
        <Box paddingBottom={2}>
          <Subtitle>Companies</Subtitle>
          <DiscoverTags tags={companyTags} onClick={handleClick} />
        </Box>
      )}
    </React.Fragment>
  );
};
