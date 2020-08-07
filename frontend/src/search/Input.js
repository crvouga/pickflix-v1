import { Box, IconButton, InputBase, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import search from "./redux";
import * as R from "ramda";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    fontSize: "1.25em",
    fontWeight: "bold",
    flex: 1,
  },
}));

const decorate = R.compose(React.memo, React.forwardRef);
export default decorate((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClear = () => {
    ref.current.value = "";
  };

  const handleChange = (e) => {
    dispatch(search.actions.setText(e.target.value));
  };

  return (
    <Box
      paddingX={2}
      paddingY={1}
      display="flex"
      alignItems="center"
      width="100%"
      className={classes.root}
    >
      <InputBase
        inputRef={ref}
        className={classes.input}
        placeholder="Search Movie or Person"
        onChange={handleChange}
      />
      <IconButton onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
});
