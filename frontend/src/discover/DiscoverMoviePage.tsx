import { makeStyles } from "@material-ui/core";
import React from "react";
import SearchModal from "./discover-movie-tune/SearchModal";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieTags from "./DiscoverMovieTags";
import NavigationBar, { APP_BAR_HEIGHT } from "./NavigationBar";

const useStyles = makeStyles((theme) => ({
  tagBar: {
    position: "sticky",
    top: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.appBar,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div>
      <NavigationBar />
      <div className={classes.tagBar}>
        <DiscoverMovieTags />
      </div>
      <DiscoverMovieResults />
      <SearchModal />
    </div>
  );
};
