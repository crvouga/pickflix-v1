import {
  AppBar,
  AppBarProps,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  ListItem,
  Avatar,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import CurrentUserAvatar from "../auth/CurrentUserAvatar";
import { actions } from "../redux";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

type Props = {
  title?: string;
  subtitle?: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    fontWeight: "bold",
    letterSpacing: "-0.5px",
    // transform: `scale(1, 1.2)`,
    // marginBottom: `-${theme.spacing(1 / 2)}px`,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatar: {
    // borderRadius: theme.spacing(1 / 2),
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1 / 2),
  },
  icon: {
    width: theme.spacing(2.4),
    height: theme.spacing(2.4),
    color: "white",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
}));

export default (props: Props) => {
  const { title, subtitle } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(actions.router.push({ pathname: "/search" }));
  };

  const onAccount = () => {
    dispatch(actions.router.push({ pathname: "/account" }));
  };

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <div className={classes.logo}>
          <Avatar className={classes.avatar}>
            <PlayArrowIcon className={classes.icon} />
          </Avatar>
          <Typography variant="h6" className={classes.title}>
            Pickflix
          </Typography>
        </div>
        <IconButton onClick={onSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton edge="end" onClick={onAccount}>
          <CurrentUserAvatar className={classes.small} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
