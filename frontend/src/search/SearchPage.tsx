import { AppBar, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <React.Fragment>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <SearchInput onChange={setSearchQuery} />
      </AppBar>
      <SearchResults searchQuery={searchQuery} />
    </React.Fragment>
  );
};
