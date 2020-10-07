import {
  Avatar,
  makeStyles,
  Typography,
  TypographyVariant,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  pick: {
    letterSpacing: "-1px",
  },
  typography: {
    fontWeight: "bold",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: "transparent", //theme.palette.primary.main,
    marginRight: theme.spacing(-1 / 2),
    marginLeft: theme.spacing(-1 / 2),
  },
  icon: {
    width: theme.spacing(2.4),
    height: theme.spacing(2.4),
    color: theme.palette.primary.main, //"white",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,
  },
}));

const variant: TypographyVariant = "h5";

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant={variant}
        className={clsx(classes.typography, classes.pick)}
      >
        pick
      </Typography>
      <Avatar className={classes.avatar}>
        <PlayArrowIcon className={classes.icon} />
      </Avatar>
      <Typography variant={variant} className={classes.typography}>
        flix
      </Typography>
    </div>
  );
};
