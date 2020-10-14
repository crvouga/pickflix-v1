import { Box, makeStyles } from "@material-ui/core";
import { difference, union, without } from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../redux/react-redux";
import { DiscoverMovieTag as IDiscoverMovieTag } from "./discover-movie-tags";
import DiscoverMovieTag from "./DiscoverMovieTag";
import { discoverMovie } from "./redux/discover-movie";

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    //
    backgroundColor: theme.palette.background.default,
    //
    padding: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();

  const tags = useSelector(discoverMovie.selectors.tags);
  const activeTags = useSelector(discoverMovie.selectors.activeTags);
  const nonActiveTags = difference(tags, activeTags);

  const dispatch = useDispatch();

  const handleClickActiveTag = (activeTag: IDiscoverMovieTag) => () => {
    dispatch(
      discoverMovie.actions.setActiveTags(without([activeTag], activeTags))
    );
  };

  const handleClickNonActiveTag = (nonActiveTag: IDiscoverMovieTag) => () => {
    dispatch(
      discoverMovie.actions.setActiveTags(union([nonActiveTag], activeTags))
    );
  };

  const chipContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chipContainerRef.current) {
      chipContainerRef.current.scrollLeft = 0;
    }
  }, [activeTags.length]);

  return (
    <div ref={chipContainerRef} className={classes.chipContainer}>
      {activeTags.map((tag) => (
        <Box key={tag.id} marginRight={1}>
          <DiscoverMovieTag
            variant="default"
            tag={tag}
            clickable
            onClick={handleClickActiveTag(tag)}
          />
        </Box>
      ))}
      {nonActiveTags.map((tag) => (
        <Box key={tag.id} marginRight={1}>
          <DiscoverMovieTag
            variant="outlined"
            tag={tag}
            clickable
            onClick={handleClickNonActiveTag(tag)}
          />
        </Box>
      ))}
    </div>
  );
};
