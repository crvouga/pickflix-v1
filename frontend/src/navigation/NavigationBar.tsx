import {
  AppBar,
  AppBarProps,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";
import { useHistory } from "react-router";

type Props = {
  title?: string;
  subtitle?: string;
  AppBarProps?: AppBarProps;
};

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    fontWeight: "bold",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default (props: Props) => {
  const { title, AppBarProps } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onBack = () => {
    history.goBack();
  };

  const onSearch = () => {
    history.push("/search");
  };

  return (
    <AppBar color="default" {...AppBarProps}>
      <Toolbar>
        <IconButton edge="start" onClick={onBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} noWrap>
          {title}
        </Typography>
        <IconButton onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
