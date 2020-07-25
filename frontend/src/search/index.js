import { AppBar, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import History from "./History";
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
  const input = useSelector(search.selectors.input);
  return (
    <div>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <Input />
      </AppBar>

      {input.text === "" ? (
        <History />
      ) : (
        <React.Fragment>
          <Status />
          <Results />
        </React.Fragment>
      )}
    </div>
  );
};
