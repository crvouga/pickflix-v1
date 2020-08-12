import { Box, makeStyles, Paper, LinearProgress } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux";
import Tag from "./Tag";

export default () => {
  const activeTags = useSelector(discover.selectors.activeTags);
  const inactiveTags = useSelector(discover.selectors.inactiveTags);

  const dispatch = useDispatch();
  const handleClickTagActive = (tag) => () => {
    dispatch(discover.actions.deactivateTags([tag]));
  };
  const handleClickTagInactive = (tag) => () => {
    dispatch(discover.actions.activateTags([tag]));
  };

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  }, [activeTags]);

  return (
    <>
      <Box display="flex" flexDirection="row" bgcolor="background.default">
        <HorizontalScroll p={2} ref={ref}>
          {activeTags.map((tag) => (
            <Box marginRight={1} key={tag.id}>
              <Tag active tag={tag} onClick={handleClickTagActive(tag)} />
            </Box>
          ))}
          {inactiveTags.map((tag) => (
            <Box marginRight={1} key={tag.id}>
              <Tag
                tag={tag}
                onClick={handleClickTagInactive(tag)}
                variant="outlined"
              />
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </>
  );
};
