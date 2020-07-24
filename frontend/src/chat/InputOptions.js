import { Avatar, Box, Chip } from "@material-ui/core";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";

import typeToIcon from "./typeToIcon";

export default () => {
  const optionsRef = useRef();

  const options = useSelector(chat.selectors.options);
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);

  const dispatch = useDispatch();

  const handleSelectOption = (option) => () => {
    const newTags = R.union(tags, [option]);
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags(newTags));
  };

  useEffect(() => {
    if (optionsRef.current) {
      optionsRef.current.scrollLeft = 0;
    }
  }, [text]);

  const filteredOptions = matchSorter(options, text, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });

  return (
    <HorizontalScroll p={1} ref={optionsRef}>
      {filteredOptions.map((option) => (
        <Box key={option.id} marginRight={1}>
          <Chip
            style={{ fontSize: "1.25em" }}
            onClick={handleSelectOption(option)}
            label={option.name}
            variant="outlined"
            avatar={
              <Avatar src={makeTMDbImageURL(2, option)}>
                {typeToIcon(option.type)}
              </Avatar>
            }
          />
        </Box>
      ))}
    </HorizontalScroll>
  );
};