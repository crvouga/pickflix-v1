import { AppBar, Fade, makeStyles, Box, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import History from "./History";
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
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.value = "";
      dispatch(search.actions.setText(""));
    }
  }, [ref.current]);

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
    inputRef.current.blur();
  };

  return (
    <div onTouchStart={blur} onMouseDown={blur}>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <Input ref={inputRef} />
      </AppBar>

      <NoResults inputRef={inputRef} />

      <Results />
      <History />
    </div>
  );
};
