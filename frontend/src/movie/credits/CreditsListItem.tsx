import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { MovieCreditCast, MovieCreditCrew } from "../../tmdb/types";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

type Props = { credit: MovieCreditCast | MovieCreditCrew };

export default ({ credit }: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/person/${credit.id}` }));
  };

  return (
    <ListItem key={credit.creditId} onClick={handleClick} button>
      <ListItemAvatar>
        <Avatar src={makeTMDbImageURL(4, credit)} />
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
