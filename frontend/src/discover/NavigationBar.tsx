import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import AccountButton from "../navigation/AccountButton";
import SearchButton from "../navigation/SearchButton";
import { AddButton, RedoButton, TuneButton, UndoButton } from "./Actions";
import DiscoverMovieTags from "./TagScroll";

const useStyles = makeStyles((theme) => ({
  navBar: {
    marginBottom: -theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar className={classes.navBar}>
        <PickflixLogo flex={1} />
        <SearchButton />
        <AccountButton />
      </Toolbar>

      <Toolbar>
        <AddButton edge="start" />
        <TuneButton />
        <UndoButton />
        <RedoButton />
      </Toolbar>

      <Box paddingBottom={2}>
        <DiscoverMovieTags />
      </Box>
    </AppBar>
  );
};
