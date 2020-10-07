import { AppBar, Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import search from "./redux";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const useInputRef = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.value = "";
      dispatch(search.actions.setText(""));
    }
  }, [dispatch, ref]);

  return ref;
};

const NoResults = () => {
  const status = useSelector(search.selectors.status);
  const results = useSelector(search.selectors.results);
  const text = useSelector(search.selectors.text);

  if (results.length === 0 && status === "success" && text.length !== 0) {
    return (
      <Box p={4}>
        <Typography align="center" color="textSecondary">
          Couldn't find anything for "{text}"
        </Typography>
      </Box>
    );
  } else {
    return null;
  }
};

export default () => {
  const classes = useStyles();
  const inputRef = useInputRef();

  const blur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div onTouchStart={blur} onMouseDown={blur}>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <Input ref={inputRef} />
      </AppBar>

      <NoResults />
      <Results />
    </div>
  );
};
