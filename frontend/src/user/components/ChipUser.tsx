import { Chip, ChipProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { User } from "../query";
import { makeUserPageRoute } from "../UserPage";
import AvatarUser from "./AvatarUser";

type Props = ChipProps & {
  user: User;
};

export default ({ user, ...props }: Props) => {
  const history = useHistory();

  return (
    <Chip
      clickable
      onClick={() => {
        history.push(makeUserPageRoute({ userId: user.id }));
      }}
      variant="outlined"
      avatar={<AvatarUser user={user} />}
      label={user.username}
      {...props}
    />
  );
};
