import { Chip, ChipProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AvatarUser from "./AvatarUser";
import { User } from "../query";

type Props = ChipProps & {
  user: User;
};

export default ({ user, ...props }: Props) => {
  const history = useHistory();

  return (
    <Chip
      clickable
      onClick={() => {
        history.push(`/user/${user.username}`);
      }}
      variant="outlined"
      avatar={<AvatarUser user={user} />}
      label={user.username}
      {...props}
    />
  );
};
