import { Box } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import { selectors, actions } from "../redux";
import { Tag as ITag } from "./redux/types";
import Tag from "./Tag";

export default () => {
  const activeTags = useSelector(selectors.discover.activeTags);
  const inactiveTags = useSelector(selectors.discover.inactiveTags);

  const dispatch = useDispatch();
  const handleClickTagActive = (tag: ITag) => () => {
    dispatch(actions.discover.deactivateTags([tag]));
  };
  const handleClickTagInactive = (tag: ITag) => () => {
    dispatch(actions.discover.activateTags([tag]));
  };

  const ref = useRef<any>();
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
