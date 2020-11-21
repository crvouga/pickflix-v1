import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import makeImageUrl from "../../media/tmdb/makeImageUrl";
import { capitalizeWords } from "../../common/utility";
import {
  DiscoverMovieTag,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "../query/types";

type Props = Omit<ListItemProps, "button"> & {
  tag: DiscoverMovieTag;
};

export default (props: Props) => {
  const { tag, ...listItemProps } = props;

  switch (tag.type) {
    case TagType.certification:
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={tag.certification} secondary="Rating" />
        </ListItem>
      );

    case TagType.sortBy:
      return (
        <ListItem {...listItemProps}>
          <ListItemText
            primary={sortByKeyToName(tag.sortBy)}
            secondary="Sort By"
          />
        </ListItem>
      );

    case TagType.releaseYearRange:
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={yearRangeToName(tag.range)} secondary="Year" />
        </ListItem>
      );

    case TagType.withPeople:
      return (
        <ListItem {...listItemProps}>
          <ListItemAvatar>
            <Avatar
              src={makeImageUrl(3, {
                profilePath: tag.profilePath,
              })}
            />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Person" />
        </ListItem>
      );

    case TagType.withCompanies:
      return (
        <ListItem {...listItemProps}>
          <ListItemAvatar>
            <Avatar
              variant="square"
              style={{
                ...(tag.logoPath ? { backgroundColor: "white" } : {}),
              }}
              src={makeImageUrl(3, { logoPath: tag.logoPath })}
            >
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Company" />
        </ListItem>
      );

    case TagType.withKeywords:
      return (
        <ListItem {...listItemProps}>
          <ListItemText
            primary={capitalizeWords(tag.name)}
            secondary="Keyword"
          />
        </ListItem>
      );

    case TagType.withGenres:
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={tag.name} secondary="Genre" />
        </ListItem>
      );
  }
};
