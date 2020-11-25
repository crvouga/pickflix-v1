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
import { User } from "../query";
import { makeUserPageRoute } from "../UserPage";
import AvatarUser from "./AvatarUser";

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
    history.push(makeUserPageRoute({ userId: user.id }));
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
