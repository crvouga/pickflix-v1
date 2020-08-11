import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import discover from "./redux";
import Tag from "./Tag";
import * as R from "ramda";
import matchSorter from "match-sorter";

const useStyles = makeStyles((theme) => ({}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tags = useSelector(discover.selectors.tags);
  const tagQuery = useSelector(discover.selectors.tagQuery);

  const sortedTags = matchSorter(tags, tagQuery, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });
  const handleClickTag = (tag) => () => {
    dispatch(discover.actions.toggle(tag));
    dispatch(discover.actions.setOpen(false));
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {sortedTags.map((tag) => (
        <Box key={tag.id} m={1 / 2}>
          <Tag tag={tag} variant="outlined" onClick={handleClickTag(tag)} />
        </Box>
      ))}
    </Box>
  );
};
