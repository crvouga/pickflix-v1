import { Avatar, Box, ChipProps } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import { capitalizeWords } from "../../common/utility";
import makeImageUrl from "../../media/tmdb/makeImageUrl";
import { commas, toRuntimeShort } from "../../movie/utils";
import {
  IDiscoverTag,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "../query/types";
import Tag from "./BaseTag";

type Props = ChipProps & {
  tag: IDiscoverTag;
};

const DiscoverTag = (props: Props) => {
  const { tag, ...chipProps } = props;

  switch (tag.type) {
    case TagType.certification:
      return <Tag label={tag.certification} {...chipProps} />;

    case TagType.sortBy:
      return <Tag label={sortByKeyToName(tag.sortBy)} {...chipProps} />;

    case TagType.releaseYearRange:
      return (
        <Tag
          // avatar={
          //   <Avatar>
          //     <ScheduleIcon />
          //   </Avatar>
          // }
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
            <Avatar
              style={{ backgroundColor: "white" }}
              variant="square"
              src={makeImageUrl(1, tag)}
            >
              <BusinessIcon />
            </Avatar>
          }
          {...chipProps}
        />
      );

    case TagType.runtimeGte:
      return (
        <Tag
          label={`> ${toRuntimeShort({ runtime: tag.runtime })}`}
          {...chipProps}
        />
      );

    case TagType.runtimeLte:
      return (
        <Tag
          label={`< ${toRuntimeShort({ runtime: tag.runtime })}`}
          {...chipProps}
        />
      );

    case TagType.voteAverageGte:
      return <Tag label={`> ${tag.voteAverage}/10 ★`} {...chipProps} />;

    case TagType.voteAverageLte:
      return <Tag label={`< ${tag.voteAverage}/10 ★`} {...chipProps} />;

    case TagType.voteCountGte:
      return (
        <Tag label={`> ${commas(tag.voteCount)} ★ count`} {...chipProps} />
      );

    case TagType.voteCountLte:
      return (
        <Tag label={`< ${commas(tag.voteCount)} ★ count`} {...chipProps} />
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

export const DiscoverTagGroup = ({
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
          <DiscoverTag tag={tag} {...ChipProps} />
        </Box>
      ))}
    </Box>
  );
};

export default DiscoverTag;
