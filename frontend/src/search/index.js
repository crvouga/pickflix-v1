import { AppBar, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import TMDbAttribution from "../tmdb/TMDbAttribution";
import EmptyResults from "./EmptyResults";
import Input from "./Input";
import search from "./redux";
import Results from "./Results";
import Status from "./Status";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
  const text = useSelector(search.selectors.text);
  const inputRef = useRef();
  const blur = () => {
    inputRef.current.blur();
  };
  return (
    <div onMouseDown={blur}>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <Input ref={inputRef} />
      </AppBar>

      {text === "" ? (
        <EmptyResults />
      ) : (
        <React.Fragment>
          <Status />
          <Results />
        </React.Fragment>
      )}
    </div>
  );
};
