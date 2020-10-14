import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { DiscoverMovieTag } from "../discover-movie-tags";
import BusinessIcon from "@material-ui/icons/Business";
import { capitalizeWords } from "../../utils";

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
              src={makeTMDbImageURL(3, {
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
            <Avatar
              variant="square"
              style={{
                ...(tag.logoPath ? { backgroundColor: "white" } : {}),
              }}
              src={makeTMDbImageURL(3, { logoPath: tag.logoPath })}
            >
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Company" />
        </ListItem>
      );

    case "withKeywords":
      return (
        <ListItem {...listItemProps}>
          <ListItemText
            primary={capitalizeWords(tag.name)}
            secondary="Keyword"
          />
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
