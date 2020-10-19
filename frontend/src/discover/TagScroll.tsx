import { Box, makeStyles } from "@material-ui/core";
import { thunkify } from "ramda";
import React, { useEffect, useRef } from "react";
import DiscoverMovieTag from "./DiscoverMovieTag";
import useDiscoverLogic from "./useDiscoverLogic";

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
  } = useDiscoverLogic();

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
            onClick={thunkify(deactivateTag)(tag)}
          />
        </Box>
      ))}
      {nonActiveTags.map((tag) => (
        <Box key={tag.id} marginRight={1}>
          <DiscoverMovieTag
            variant="outlined"
            tag={tag}
            clickable
            onClick={thunkify(activateTag)(tag)}
          />
        </Box>
      ))}
    </div>
  );
};
