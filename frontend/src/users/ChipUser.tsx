import { Chip, ChipProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AvatarUser from "./AvatarUser";
import { User } from "./query";

type Props = {
  user: User;
  noLink?: boolean;
} & ChipProps;

export default ({ user, noLink = false, ...props }: Props) => {
  const history = useHistory();

  return (
    <Chip
      clickable={!noLink}
      onClick={() => {
        if (!noLink) {
          history.push(`/user/${user.username}`);
        }
      }}
      variant="outlined"
      avatar={<AvatarUser user={user} />}
      label={user.username}
      {...props}
    />
  );
};
