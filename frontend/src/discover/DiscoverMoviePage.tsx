import { makeStyles } from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import NavigationBarTopLevel, {
  APP_BAR_HEIGHT,
} from "../navigation/NavigationBarTopLevel";
import DiscoverMovieTuneModal from "./discover-movie-tune/SearchModal";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieSpeedDial from "./DiscoverMovieSpeedDial";
import DiscoverMovieTags from "./DiscoverMovieTags";
import { useSelector } from "../redux/react-redux";
import { discoverMovie } from "./redux/discover-movie";

const useStyles = makeStyles((theme) => ({
  tagBar: {
    position: "sticky",
    top: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.appBar,
  },
}));

const useScrollToTopRef = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const activeTags = useSelector(discoverMovie.selectors.activeTags);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [activeTags.length]);
  return ref;
};

export default () => {
  const classes = useStyles();

  return (
    <div>
      <NavigationBarTopLevel />
      <div className={classes.tagBar}>
        <DiscoverMovieTags />
      </div>
      <DiscoverMovieResults />
      <DiscoverMovieTuneModal />
      <DiscoverMovieSpeedDial />
    </div>
  );
};
