import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { TmdbMediaType } from "../../tmdb/types";
import useActions from "./useActions";

type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};
export default (props: Props) => {
  const { tmdbMediaId, tmdbMediaType } = props;

  const movieActions = useActions({
    tmdbMediaId,
    tmdbMediaType,
  });

  const actionBarItems = [
    movieActions.like,
    movieActions.watchNext,
    movieActions.watchWith,
    movieActions.addListItem,
  ];

  return (
    <List>
      {actionBarItems.map(({ icon, label, onClick }) => (
        <ListItem key={label} onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
};
