import { IconButton, IconButtonProps, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AvatarCurrentUser from "../auth/AvatarCurrentUser";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "0.5em",
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
      <AvatarCurrentUser className={classes.small} />
    </IconButton>
  );
};
