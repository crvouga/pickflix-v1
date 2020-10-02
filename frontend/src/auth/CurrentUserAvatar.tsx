import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../redux";
import { Skeleton } from "@material-ui/lab";

export default ({ backgroundColor }: { backgroundColor: string }) => {
  const user = useSelector(selectors.auth.user);
  const authStatus = useSelector(selectors.auth.authStatus);

  if (!user) {
    return <Avatar />;
  }

  const avatarComponent = (
    <Avatar style={{ backgroundColor }} src={user.photoURL || ""} />
  );

  switch (authStatus) {
    case "loading":
      return <Skeleton>{avatarComponent}</Skeleton>;

    case "signedIn":
      return avatarComponent;

    case "signedOut":
      return <Avatar />;
  }
};
