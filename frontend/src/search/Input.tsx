import {
  AppBar,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    fontSize: "1.25em",
    fontWeight: "bold",
    flex: 1,
  },
}));

interface Props {
  ref: React.MutableRefObject<HTMLInputElement | undefined>;
}

export default ({ ref }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClear = () => {
    if (ref?.current) {
      ref.current.focus();
      ref.current.value = "";
    }

    dispatch(actions.search.setText(""));
  };

  const onBack = () => {
    history.goBack();
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    dispatch(actions.search.setText(e.target.value));
  };

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <IconButton edge="start" onClick={onBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <InputBase
          autoFocus
          inputRef={ref}
          className={classes.input}
          placeholder="Search Movie or Person"
          onChange={handleChange}
        />
        <IconButton edge="end" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
