import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import DiscoverMovieTag from "./DiscoverMovieTag";
import useDiscoverState from "./redux/useDiscoverState";
import { descend, sort } from "ramda";

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    //
    paddingLeft: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();

  const {
    activeTags,
    nonActiveTags,
    deactivateTag,
    activateTag,
  } = useDiscoverState();

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
            onClick={() => {
              deactivateTag(tag);
            }}
          />
        </Box>
      ))}
      {nonActiveTags.map((tag) => (
        <Box key={tag.id} marginRight={1}>
          <DiscoverMovieTag
            variant="outlined"
            tag={tag}
            clickable
            onClick={() => {
              activateTag(tag);
            }}
          />
        </Box>
      ))}
    </div>
  );
};
