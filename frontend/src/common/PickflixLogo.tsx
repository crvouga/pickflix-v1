import {
  Avatar,
  makeStyles,
  Typography,
  TypographyVariant,
  BoxProps,
  Box,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router";

type StyleProps = {
  scale: number;
};

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
    transform: ({ scale }: StyleProps) => `scale(${scale})`,
    cursor: "pointer",
    // justifyContent: "center",
  },
}));

const variant: TypographyVariant = "h5";

type Props = BoxProps & {
  scale?: number;
};

export default ({ scale = 1, ...props }: Props) => {
  const classes = useStyles({ scale });

  return (
    <Box className={classes.root} {...props}>
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
    </Box>
  );
};
