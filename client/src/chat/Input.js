import {
  Avatar,
  Box,
  Chip,
  Fab,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import clsx from "clsx";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import modal from "../common/redux/modal";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import typeToIcon from "./typeToIcon";
import useBoolean from "../common/hooks/useBoolean";

const useStyles = makeStyles((theme) => ({
  border: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: "2em",
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
  },
}));

export default () => {
  const classes = useStyles();
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
    inputRef.current.focus();
    const newTags = R.union(tags, [option]);
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags(newTags));
  };
  const handleTagDelete = (tag) => (e) => {
    inputRef.current.focus();
    const newTags = R.without([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };
  const handleSend = () => {
    inputRef.current.focus();
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags([]));
    dispatch(chat.actions.sendMessage({ author: "user", tags }));
  };

  const inputFocused = useBoolean(false);
  const focus = () => {
    inputRef.current.focus();
  };

  const filteredOptions = matchSorter(options, text, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });
  const focused = useSelector(chat.selectors.focused);

  const handleBlur = () => {
    dispatch(chat.actions.setFocus(false));
  };

  const handleFocus = () => {
    dispatch(chat.actions.setFocus(true));
  };

  useEffect(() => {
    if (inputRef.current) {
      if (focused) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [inputRef.current, focused]);

  return (
    <Box onClick={focus}>
      <div className={classes.border}>
        {tags.length > 0 && (
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            maxWidth="100%"
            className={classes.borderBottom}
          >
            {tags.map((tag) => (
              <Box key={tag.id} margin={1}>
                <Chip
                  size="small"
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
          </Box>
        )}
        <Box display="flex" flexDirection="row">
          <Box
            component={InputBase}
            flex={1}
            paddingLeft={2}
            value={text}
            onChange={handleInputChange}
            inputRef={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Person, Genre, Date, Company, Keyword, ..."
          />
          <Fab
            size="small"
            onClick={handleSend}
            color="primary"
            disabled={tags.length === 0}
          >
            <ArrowUpwardIcon
              style={{ color: tags.length === 0 ? "inherit" : "white" }}
            />
          </Fab>
        </Box>
      </div>

      <HorizontalScroll p={1}>
        <div id="option-list-start" />
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
