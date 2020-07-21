import {
  CircularProgress,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Box,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    flex: 1,
  },
  loading: {
    marginRight: theme.spacing(1),
  },
}));

export default ({ loading, onClear, InputBaseProps }) => {
  const classes = useStyles();
  const { value } = InputBaseProps;
  return (
    <Box
      paddingX={2}
      display="flex"
      alignItems="center"
      width="100%"
      className={classes.root}
    >
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
    </Box>
  );
};
