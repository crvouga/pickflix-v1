import { Box, Divider, Typography, TypographyProps } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { sortBy } from "ramda";
import React from "react";
import { useQuery } from "react-query";
import useModal from "../app/modals/useModal";
import HorizontalScroll from "../common/components/HorizontalScroll";
import HorizontalSnapScroll from "../common/components/HorizontalSnapScroll";
import { ResponsiveDialog } from "../common/components/ResponsiveDialog";
import DiscoverTag from "./components/DiscoverTag";
import { getMovieCertifications, queryKeys } from "./query";
import {
  IDiscoverTag,
  RELEASE_YEAR_TAGS,
  RUNTIME_GTE_TAGS,
  RUNTIME_LTE_TAGS,
  SORT_BY_TAGS,
  TagType,
  VOTE_AVERAGE_GTE_TAGS,
  VOTE_AVERAGE_LTE_TAGS,
  VOTE_COUNT_GTE_TAGS,
  VOTE_COUNT_LTE_TAGS,
} from "./query/types";
import { getMovieGenreTagsById } from "./redux/discover-saga";
import useDiscoverState from "./redux/useDiscoverState";

const Title = (props: TypographyProps) => (
  <Box p={2} paddingBottom={1 / 2}>
    <Typography variant="h6" {...props} />
  </Box>
);

const Tags = ({
  tags,
  onClick,
}: {
  tags: IDiscoverTag[];
  onClick?: (tag: IDiscoverTag) => void;
}) => {
  return (
    <HorizontalSnapScroll>
      {tags.map((tag) => (
        <Box
          key={tag.id}
          m={1 / 2}
          onClick={() => {
            if (onClick) {
              onClick(tag);
            }
          }}
        >
          <DiscoverTag clickable variant="outlined" tag={tag} />
        </Box>
      ))}
    </HorizontalSnapScroll>
  );
};

const TagsSkeleton = () => {
  return (
    <HorizontalScroll paddingX={2} p={1} marginBottom={1}>
      <Skeleton variant="rect" height="2.5em" width="100%" />
    </HorizontalScroll>
  );
};

const TagsCertificationContainer = ({
  onClick,
}: {
  onClick?: (tag: IDiscoverTag) => void;
}) => {
  const query = useQuery(queryKeys.certifications(), () =>
    getMovieCertifications()
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <TagsSkeleton />;
  }

  const certificationsUSTags: IDiscoverTag[] = sortBy(
    (_) => _.order,
    query.data.certifications.US
  ).map((certification) => ({
    type: TagType.certification,
    id: certification.certification,
    certification: certification.certification,
    certificationCountry: "US",
  }));

  return <Tags onClick={onClick} tags={certificationsUSTags} />;
};

const TagsGenreContainer = ({
  onClick,
}: {
  onClick?: (tag: IDiscoverTag) => void;
}) => {
  const query = useQuery(["movie", "genre", "tags"], () =>
    getMovieGenreTagsById()
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <TagsSkeleton />;
  }

  const genreTags = Object.values(query.data);

  return <Tags onClick={onClick} tags={genreTags} />;
};

export default () => {
  const { isOpen, close } = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (tag: IDiscoverTag) => {
    close();
    activateTag(tag);
  };

  return (
    <ResponsiveDialog open={isOpen} onClose={close} showDoneButton>
      <Box paddingBottom={2}>
        <Title>Decades</Title>
        <Tags tags={RELEASE_YEAR_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Genres</Title>
        <TagsGenreContainer onClick={handleClick} />
        <Divider />

        <Title>Sort By</Title>
        <Tags tags={SORT_BY_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Rating</Title>
        <TagsCertificationContainer onClick={handleClick} />
        <Divider />

        <Title>Vote Count Less Than</Title>
        <Tags tags={VOTE_COUNT_LTE_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Vote Count Greater Than</Title>
        <Tags tags={VOTE_COUNT_GTE_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Vote Average Less Than</Title>
        <Tags tags={VOTE_AVERAGE_LTE_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Vote Average Greater Than</Title>
        <Tags tags={VOTE_AVERAGE_GTE_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Runtime Less Than</Title>
        <Tags tags={RUNTIME_LTE_TAGS} onClick={handleClick} />
        <Divider />

        <Title>Runtime Greater Than</Title>
        <Tags tags={RUNTIME_GTE_TAGS} onClick={handleClick} />
        <Divider />
      </Box>
    </ResponsiveDialog>
  );
};
