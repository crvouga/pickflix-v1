import { Avatar, AvatarProps } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../redux";

type Props = AvatarProps & {
  backgroundColor?: string;
};

export default (props: Props) => {
  const { backgroundColor = "white", className, ...AvatarProps } = props;

  const user = useSelector(selectors.auth.user);
  const authStatus = useSelector(selectors.auth.authStatus);

  switch (authStatus) {
    case "loading":
      return (
        <Skeleton variant="circle" className={className}>
          <Avatar className={className} {...AvatarProps} />
        </Skeleton>
      );

    case "signedIn":
      return (
        <Avatar
          className={className}
          style={{ backgroundColor }}
          src={user?.photoURL || ""}
          {...AvatarProps}
        />
      );

    case "signedOut":
      return <Avatar className={className} {...AvatarProps} />;
  }
};
