import { Box, IconButton, InputBase, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import search from "./redux";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    fontSize: "1.25em",
    fontWeight: "bold",
    flex: 1,
  },
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const text = useSelector(search.selectors.text);

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(search.actions.setText(""));
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    dispatch(search.actions.setText(newText));
  };

  useEffect(() => {
    ref.current && ref.current.focus();
    dispatch(search.actions.setText(""));
  }, []);

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
        className={classes.input}
        inputRef={ref}
        value={text}
        placeholder="Search Movie or Person"
        onChange={handleInputChange}
      />

      <IconButton disabled={text === ""} onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
});
