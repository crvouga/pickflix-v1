import { Avatar, ChipProps } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import makeImageUrl from "../tmdb/makeImageUrl";
import { capitalizeWords } from "../utils";
import Tag from "./BaseTag";
import {
  DiscoverMovieTag,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "./query/types";

type Props = ChipProps & {
  tag: DiscoverMovieTag;
};

export default (props: Props) => {
  const { tag, ...chipProps } = props;

  switch (tag.type) {
    case TagType.certification:
      return <Tag label={tag.certification} {...chipProps} />;

    case TagType.sortBy:
      return <Tag label={sortByKeyToName(tag.sortBy)} {...chipProps} />;

    case TagType.releaseYearRange:
      return <Tag label={yearRangeToName(tag.range)} {...chipProps} />;

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
      return <Tag label={capitalizeWords(tag?.name || "")} {...chipProps} />;
  }
};
