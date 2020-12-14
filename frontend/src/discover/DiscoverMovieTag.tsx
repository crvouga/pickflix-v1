import { Avatar, Box, ChipProps } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import { capitalizeWords } from "../common/utility";
import makeImageUrl from "../media/tmdb/makeImageUrl";
import Tag from "./BaseTag";
import {
  IDiscoverTag,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "./query/types";
import ScheduleIcon from "@material-ui/icons/Schedule";

type Props = ChipProps & {
  tag: IDiscoverTag;
};

const DiscoverMovieTag = (props: Props) => {
  const { tag, ...chipProps } = props;

  switch (tag.type) {
    case TagType.certification:
      return <Tag label={tag.certification} {...chipProps} />;

    case TagType.sortBy:
      return <Tag label={sortByKeyToName(tag.sortBy)} {...chipProps} />;

    case TagType.releaseYearRange:
      return (
        <Tag
          avatar={
            <Avatar>
              <ScheduleIcon />
            </Avatar>
          }
          label={yearRangeToName(tag.range)}
          {...chipProps}
        />
      );

    case TagType.withPeople:
      return (
        <Tag
          label={tag.name}
          avatar={<Avatar src={makeImageUrl(1, tag)} />}
          {...chipProps}
        />
      );

    case TagType.withCompanies:
      return (
        <Tag
          label={tag.name}
          avatar={
            <Avatar variant="square" src={makeImageUrl(1, tag)}>
              <BusinessIcon />
            </Avatar>
          }
          {...chipProps}
        />
      );

    default:
      return (
        <Tag
          label={capitalizeWords("name" in tag && tag.name ? tag.name : "")}
          {...chipProps}
        />
      );
  }
};

export const DiscoverMovieTagGroup = ({
  tagsById,
  ChipProps,
}: {
  tagsById: { [id: string]: IDiscoverTag };
  ChipProps?: ChipProps;
}) => {
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center">
      {Object.values(tagsById).map((tag) => (
        <Box key={tag.id} m={1 / 2}>
          <DiscoverMovieTag tag={tag} {...ChipProps} />
        </Box>
      ))}
    </Box>
  );
};

export default DiscoverMovieTag;
