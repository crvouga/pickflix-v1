import { Avatar, AvatarProps } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import AvatarUser from "../users/AvatarUser";
import useCurrentUser from "../users/useCurrentUser";

export default (props: AvatarProps) => {
  const currentUser = useCurrentUser();

  if (currentUser === "loading") {
    return (
      <Skeleton variant="circle" className={props.className}>
        <Avatar {...props} />
      </Skeleton>
    );
  }

  if (currentUser === null) {
    return <Avatar {...props} />;
  }

  return <AvatarUser user={currentUser} {...props} />;
};
