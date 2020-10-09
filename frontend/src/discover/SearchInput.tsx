import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    position: "sticky",
    zIndex: theme.zIndex.modal + 1,
    top: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1),
  },
}));

const useStylesInputBase = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontSize: "1.5em",
    width: "100%",
  },
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const classesInputBase = useStylesInputBase();

  const status = useSelector(selectors.discover.searchStatus);

  const dispatch = useDispatch();
  const handleClose = () => {};
  const handleChangeInputBase = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.discover.setSearchText(e.target.value));
  };

  return (
    <Paper className={classes.root}>
      <IconButton edge="start" onClick={handleClose}>
        <ArrowBackIcon />
      </IconButton>
      <InputBase
        autoFocus
        inputRef={ref}
        classes={classesInputBase}
        placeholder="Genre, Person, Keyword, ..."
        onChange={handleChangeInputBase}
      />
      <Box>{status === "loading" && <CircularProgress disableShrink />}</Box>
    </Paper>
  );
});
