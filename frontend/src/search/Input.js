import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import search from "./redux";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    flex: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const inputRef = useRef();
  const input = useSelector(search.selectors.input);

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(search.actions.setInput({ text: "" }));
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    dispatch(search.actions.setInput({ text: newText }));
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    dispatch(search.actions.setInput({ text: "" }));
  }, []);

  return (
    <Box
      paddingX={2}
      display="flex"
      alignItems="center"
      width="100%"
      className={classes.root}
    >
      <InputBase
        className={classes.input}
        inputRef={inputRef}
        value={input.text}
        placeholder={"Search Movie or Person"}
        onChange={handleInputChange}
      />
      <IconButton disabled={input.text === ""} onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
};
