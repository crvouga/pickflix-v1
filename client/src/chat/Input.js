import {
  Avatar,
  Box,
  Button,
  Chip,
  InputBase,
  Paper,
  IconButton,
  TextField,
  Fab,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import modal from "../common/redux/modal";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import typeToIcon from "./typeToIcon";

export default () => {
  const dispatch = useDispatch();
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);
  const options = useSelector(chat.selectors.options);

  const inputRef = useRef();
  const isChatOpen = useSelector(modal.selectors.isOpen("chat"));
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200);
    }
  }, [isChatOpen, inputRef.current]);

  const handleInputChange = (e) => {
    dispatch(chat.actions.setText(e.target.value));
  };
  const handleSelectOption = (option) => () => {
    const newTags = R.union(tags, [option]);
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags(newTags));
  };
  const handleTagDelete = (tag) => () => {
    const newTags = R.without([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };
  const handleSend = () => {
    inputRef.current.focus();
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags([]));
    dispatch(chat.actions.sendMessage({ author: "user", tags }));
  };

  const filteredOptions = matchSorter(options, text, {
    keys: ["name"],
  });

  console.log({ filteredOptions });

  return (
    <Box>
      <HorizontalScroll p={2} maxWidth="100%">
        {tags.map((tag) => (
          <Box key={tag.id} marginRight={1}>
            <Chip
              onDelete={handleTagDelete(tag)}
              label={tag.name}
              avatar={
                <Avatar src={makeTMDbImageURL(2, tag)}>
                  {typeToIcon(tag.type)}
                </Avatar>
              }
            />
          </Box>
        ))}
      </HorizontalScroll>
      <Box display="flex" flexDirection="row" maxWidth="100vw">
        <Box
          component={InputBase}
          flex={1}
          paddingLeft={2}
          value={text}
          onChange={handleInputChange}
          inputRef={inputRef}
        />
        <Fab
          size="small"
          onClick={handleSend}
          color="primary"
          variant="contained"
        >
          <ArrowUpwardIcon />
        </Fab>
      </Box>

      <HorizontalScroll p={1}>
        {filteredOptions.map((option) => (
          <Box key={option.id} marginRight={1}>
            <Chip
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
    </Box>
  );
};
