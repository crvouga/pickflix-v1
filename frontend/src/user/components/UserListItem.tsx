import {
  CardActionArea,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AvatarUser from "./AvatarUser";
import { User } from "../query";

type Props = Omit<ListItemProps, "button"> & {
  user: User;
  disabled?: boolean;
  onClick?: () => void;
  ListItemTextProps?: ListItemTextProps;
};

export default ({
  user,
  disabled,
  onClick,
  ListItemTextProps,
  ...ListItemProps
}: Props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/user/${user.username}`);
  };
  return (
    <CardActionArea
      disabled={Boolean(disabled)}
      onClick={onClick || handleClick}
    >
      <ListItem {...ListItemProps}>
        <ListItemAvatar>
          <AvatarUser user={user} />
        </ListItemAvatar>
        <ListItemText primary={user.username} {...ListItemTextProps} />
      </ListItem>
    </CardActionArea>
  );
};
