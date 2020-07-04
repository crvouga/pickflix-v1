import {
  CircularProgress,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  input: {
    flex: 1,
  },
  loading: {
    marginRight: theme.spacing(1),
  },
}));

export default ({ loading, onBack, onClear, InputBaseProps }) => {
  const classes = useStyles();
  const { value } = InputBaseProps;
  return (
    <div className={classes.root}>
      <IconButton edge="start" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <InputBase className={classes.input} {...InputBaseProps} />
      {loading ? (
        <CircularProgress
          className={classes.loading}
          size="2rem"
          disableShrink
        />
      ) : (
        <IconButton disabled={value === ""} onClick={onClear}>
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};
