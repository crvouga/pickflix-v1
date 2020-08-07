import { AppBar, makeStyles } from "@material-ui/core";
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

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      dispatch(search.actions.setText(""));
    }
  }, [inputRef.current]);

  const blur = () => {
    inputRef.current.blur();
  };

  const isTextEmpty = useSelector(search.selectors.isTextEmpty);

  return (
    <div onTouchStart={blur} onMouseDown={blur}>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <Input ref={inputRef} />
      </AppBar>

      {isTextEmpty ? <History /> : <Results />}
    </div>
  );
};
