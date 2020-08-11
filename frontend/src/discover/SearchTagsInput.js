import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useDispatch } from "react-redux";
import discover from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  searchBar: {
    position: "sticky",
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
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(discover.actions.setOpen(false));
  };
  const handleChangeInputBase = (e) => {
    dispatch(discover.actions.tagQueryChanged(e.target.value));
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.searchBar}>
        <IconButton edge="start" onClick={handleClose}>
          <ArrowBackIcon />
        </IconButton>
        <InputBase
          inputRef={ref}
          classes={classesInputBase}
          placeholder="Genre, People, Date, ..."
          onChange={handleChangeInputBase}
        />
      </div>
    </Paper>
  );
});
