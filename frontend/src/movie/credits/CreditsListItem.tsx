import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import makeImageUrl from "../../tmdb/makeImageUrl";
import { MovieCreditCast, MovieCreditCrew } from "../../tmdb/types";

type Props = { credit: MovieCreditCast | MovieCreditCrew };

export default ({ credit }: Props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/person/${credit.id}`);
  };

  return (
    <ListItem key={credit.creditId} onClick={handleClick} button>
      <ListItemAvatar>
        <Avatar src={makeImageUrl(4, credit)} />
      </ListItemAvatar>
      <ListItemText
        primary={credit.name}
        secondary={
          "job" in credit
            ? credit.job
            : "character" in credit
            ? credit.character
            : "-"
        }
      />
    </ListItem>
  );
};
