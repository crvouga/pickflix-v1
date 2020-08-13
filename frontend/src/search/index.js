import { AppBar, Fade, makeStyles } from "@material-ui/core";
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
      <Results />
      <History />
    </div>
  );
};
