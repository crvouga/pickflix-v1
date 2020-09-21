import { Box } from "@material-ui/core";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../redux/modal";
import discover from "./redux";
import Tag from "./Tag";

export default () => {
  const dispatch = useDispatch();
  const tags = useSelector(discover.selectors.tags);
  const searchResults = useSelector(discover.selectors.searchResults);
  const searchText = useSelector(discover.selectors.searchText);

  const sortedTags = matchSorter(
    R.uniqBy(R.prop("id"), R.concat(tags, searchResults)),
    searchText,
    {
      keys: ["name"],
      threshold: matchSorter.rankings.NO_MATCH,
    }
  );

  const handleClickTag = (tag) => () => {
    dispatch(discover.actions.activateTags([tag]));
    dispatch(modal.actions.close("discover/SearchModal"));
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
