import { Avatar, AvatarProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { nameToInitials } from "../utils";
import { User } from "./query/types";

type Props = AvatarProps & {
  user: User;
};

//SOURCE: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
function stringToHslColor(str: string, s: number, l: number) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
    backgroundColor: ({ user }: { user: User }) =>
      stringToHslColor(user.username, 50, 50),
  },
}));

export default ({ user, ...AvatarProps }: Props) => {
  const classes = useStyles({ user });
  const initials = nameToInitials(user.displayName);
  const className = clsx(classes.avatar, AvatarProps.className);
  return (
    <Avatar {...AvatarProps} className={className}>
      {initials}
    </Avatar>
  );
};
