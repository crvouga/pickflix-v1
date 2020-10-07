import { Avatar, AvatarProps, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ReadMore from "./ReadMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    padding: theme.spacing(2),
  },
  avatarContainer: {
    marginRight: theme.spacing(2),
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
}));

type Props = {
  AvatarProps: AvatarProps;
  title: string;
  body: string;
};

export default ({ AvatarProps, title, body }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar {...AvatarProps} />
      </div>
      <div className={classes.body}>
        <Typography color="textSecondary">{title}</Typography>
        <ReadMore TypographyProps={{ color: "textPrimary" }} text={body} />
      </div>
    </div>
  );
};
