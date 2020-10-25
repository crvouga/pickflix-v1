import { Avatar, AvatarProps } from "@material-ui/core";
import React from "react";
import { User } from "./query/types";

type Props = AvatarProps & {
  user: User;
};

export default ({ user, ...AvatarProps }: Props) => {
  return (
    <Avatar style={{ color: "white" }} {...AvatarProps}>
      {user.displayName[0]}
    </Avatar>
  );
};
