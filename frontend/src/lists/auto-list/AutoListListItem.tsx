import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ErrorBox from "../../common/components/ErrorBox";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { AutoListKey } from "../types";
import AutoListIcon from "./AutoListIcon";
import useAutoList from "./useAutoListLogic";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
  },
  avatar: {
    backgroundColor: "transparent",
  },
}));

type Props = {
  autoListKey: AutoListKey;
};

export default ({ autoListKey }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/auto-list/${autoListKey}`);
  };

  const { query } = useAutoList(autoListKey);

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <ListItemSkeleton />;
  }

  const list = query.data;

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <AutoListIcon className={classes.icon} autoListKey={autoListKey} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={list.title}
        secondary={`${list.listItemCount} items`}
      />
    </ListItem>
  );
};
