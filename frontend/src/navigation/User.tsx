import {
  ButtonBase,
  IconButton,
  IconButtonProps,
  makeStyles,
  ButtonBaseProps,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AvatarCurrentUser from "../auth/AvatarCurrentUser";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "0.5em",
  },
  circle: {
    borderRadius: "50%",
  },
}));

type Props = ButtonBaseProps & {
  size?: "small" | "large";
};

export const AvatarButtonCurrentUser = ({
  size = "large",
  ...props
}: Props) => {
  const classes = useStyles();

  return (
    <ButtonBase className={classes.circle} {...props}>
      <AvatarCurrentUser
        className={clsx({ [classes.small]: size === "small" })}
      />
    </ButtonBase>
  );
};

export const IconButtonUser = (props: IconButtonProps) => {
  const classes = useStyles();
  const history = useHistory();
  const onAccount = () => {
    history.push("/account");
  };

  return (
    <IconButton onClick={onAccount} {...props}>
      <AvatarCurrentUser className={classes.small} />
    </IconButton>
  );
};
