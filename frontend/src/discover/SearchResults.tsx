import { Box } from "@material-ui/core";
import matchSorter from "match-sorter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";
import { Tag as ITag } from "./redux/types";
import Tag from "./Tag";

export default () => {
  const dispatch = useDispatch();

  const tags = useSelector(selectors.discover.tags);
  const searchText = useSelector(selectors.discover.searchText);

  const sortedTags = matchSorter(tags, searchText, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });

  const handleClickTag = (tag: ITag) => () => {
    dispatch(actions.discover.activateTags([tag]));
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
