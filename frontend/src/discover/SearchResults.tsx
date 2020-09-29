import { Box } from "@material-ui/core";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import Tag from "./Tag";
import { ModalName } from "../redux/router/types";
import { Tag as ITag, Result } from "./redux/types";

export default () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectors.discover.tags);
  const searchResults = useSelector(selectors.discover.searchResults);
  const searchText = useSelector(selectors.discover.searchText);

  const sortedTags = matchSorter(
    [...tags, ...(searchResults as ITag[])],
    searchText,
    {
      keys: ["name"],
      threshold: matchSorter.rankings.NO_MATCH,
    }
  );

  const handleClickTag = (tag: ITag) => () => {
    dispatch(actions.discover.activateTags([tag]));
    dispatch(actions.router.close({ name: ModalName.DiscoverSearch }));
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
