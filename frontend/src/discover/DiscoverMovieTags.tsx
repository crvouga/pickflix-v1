import { Box, makeStyles, IconButton } from "@material-ui/core";
import { difference, union, without } from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../redux/react-redux";
import { DiscoverMovieTag as IDiscoverMovieTag } from "./discover-movie-tags";
import DiscoverMovieSortByTag from "./DiscoverMovieSortByTag";
import DiscoverMovieTag from "./DiscoverMovieTag";
import { discoverMovie } from "./redux/discover-movie";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import useModal from "../navigation/modals/useModal";
const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
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

  const discoverMovieTagSearchModal = useModal("DiscoverMovieTagSearch");

  return (
    <div ref={chipContainerRef} className={classes.chipContainer}>
      <Box marginRight={1}>
        <IconButton size="small" onClick={discoverMovieTagSearchModal.open}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <Box marginRight={1}>
        <DiscoverMovieSortByTag />
      </Box>
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
