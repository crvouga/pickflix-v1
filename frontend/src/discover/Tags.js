import { Box, makeStyles, Paper } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux";
import Tag from "./Tag";

export default () => {
  const selectedTags = useSelector(discover.selectors.selectedTags);
  const unselectedTags = useSelector(discover.selectors.unselectedTags);

  const dispatch = useDispatch();
  const handleClickTag = (tag) => () => {
    dispatch(discover.actions.toggle(tag));
  };

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  }, [selectedTags]);

  return (
    <Paper>
      <Box display="flex" flexDirection="row">
        <HorizontalScroll p={2} ref={ref}>
          {selectedTags.map((tag) => (
            <Box marginRight={1} key={tag.id}>
              <Tag tag={tag} onClick={handleClickTag(tag)} />
            </Box>
          ))}
          {unselectedTags.map((tag) => (
            <Box marginRight={1} key={tag.id}>
              <Tag tag={tag} onClick={handleClickTag(tag)} variant="outlined" />
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </Paper>
  );
};
