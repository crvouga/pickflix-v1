import React from "react";
import {
  ListItemProps,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Avatar,
} from "@material-ui/core";
import { DiscoverMovieTag } from "./discover-movie-tags";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

type Props = Omit<ListItemProps, "button"> & {
  tag: DiscoverMovieTag;
};

export default (props: Props) => {
  const { tag, ...listItemProps } = props;

  switch (tag.type) {
    case "withPeople":
      return (
        <ListItem {...listItemProps}>
          <ListItemAvatar>
            <Avatar
              src={makeTMDbImageURL(1, {
                profilePath: tag.profilePath,
              })}
            />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Person" />
        </ListItem>
      );

    case "withCompanies":
      return (
        <ListItem {...listItemProps}>
          <ListItemAvatar>
            <Avatar src={makeTMDbImageURL(2, { logoPath: tag.logoPath })} />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Company" />
        </ListItem>
      );

    case "withKeywords":
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={tag.name} secondary="Keyword" />
        </ListItem>
      );

    case "withGenres":
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={tag.name} secondary="Genre" />
        </ListItem>
      );

    default:
      return (
        <ListItem {...listItemProps}>
          <ListItemText primary={tag.name} />
        </ListItem>
      );
  }
};
