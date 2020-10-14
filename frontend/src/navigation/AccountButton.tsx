import { IconButton, makeStyles, IconButtonProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import CurrentUserAvatar from "../auth/CurrentUserAvatar";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export const APP_BAR_HEIGHT = "56px";

export default (props: IconButtonProps) => {
  const classes = useStyles();
  const history = useHistory();
  const onAccount = () => {
    history.push("/account");
  };

  return (
    <IconButton onClick={onAccount} {...props}>
      <CurrentUserAvatar className={classes.small} />
    </IconButton>
  );
};
