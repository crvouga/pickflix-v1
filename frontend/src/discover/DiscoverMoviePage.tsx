import { Box, makeStyles, Paper, Toolbar, AppBar } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import AccountButton from "../navigation/AccountButton";
import SearchButton from "../navigation/SearchButton";
import ActionBar from "./ActionBar";
import SearchModal from "./discover-search/SearchModal";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieTags from "./TagScroll";

const useStyles = makeStyles((theme) => ({
  navBar: {
    marginBottom: -theme.spacing(2),
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar className={classes.navBar}>
        <PickflixLogo flex={1} />
        <SearchButton />
        <AccountButton />
      </Toolbar>

      <ActionBar />
      <Box paddingBottom={2}>
        <DiscoverMovieTags />
      </Box>
    </AppBar>
  );
};

export default () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <DiscoverMovieResults />
      <SearchModal />
    </React.Fragment>
  );
};
