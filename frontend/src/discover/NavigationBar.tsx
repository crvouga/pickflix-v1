import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import { IconButtonUser } from "../navigation/User";
import { SearchButton } from "../navigation/Search";
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
        <IconButtonUser />
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
