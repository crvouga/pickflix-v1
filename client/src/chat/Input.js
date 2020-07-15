import {
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  Fab,
  InputBase,
  makeStyles,
  CircularProgress,
  LinearProgress,
  Grow,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import matchSorter from "match-sorter";
import * as R from "ramda";
import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";
import typeToIcon from "./typeToIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  backdrop: {
    filter: "blur(5px)",
  },
  border: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: "2em",
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
  },
}));

const Options = () => {
  const optionsRef = useRef();
  const refs = useContext(RefsContext);

  const options = useSelector(chat.selectors.options);
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);

  const dispatch = useDispatch();

  const handleSelectOption = (option) => () => {
    refs.input.current.focus();
    const newTags = R.union(tags, [option]);
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags(newTags));
  };

  const filteredOptions = matchSorter(options, text, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });

  return (
    <HorizontalScroll ref={optionsRef} p={1}>
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
  );
};

const Tags = () => {
  const refs = useContext(RefsContext);
  const tags = useSelector(chat.selectors.tags);
  const dispatch = useDispatch();
  const handleTagDelete = (tag) => (e) => {
    refs.input.current.focus();
    const newTags = R.without([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };
  return (
    <Collapse in={tags.length !== 0}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" maxWidth="100%">
        {tags.map((tag) => (
          <Box key={tag.id} margin={1}>
            <Chip
              clickable
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
      <Divider />
    </Collapse>
  );
};

const InputField = () => {
  const refs = useContext(RefsContext);

  const isFetchingOptions = useSelector(chat.selectors.isFetchingOptions);
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    dispatch(chat.actions.setText(e.target.value));
  };

  const handleSend = () => {
    refs.input.current.focus();
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags([]));
    dispatch(chat.actions.sendMessage({ author: "user", tags }));
  };

  const handleFocus = () => {
    if (refs.messageListBottom.current) {
      refs.messageListBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBlur = () => {};

  return (
    <Box display="flex" flexDirection="row">
      <Box
        component={InputBase}
        flex={1}
        paddingLeft={2}
        value={text}
        onChange={handleInputChange}
        inputRef={refs.input}
        placeholder="Person, Genre, Date, Company, Keyword, ..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Grow in={isFetchingOptions}>
        <Box marginY="auto" marginRight={1}>
          <CircularProgress disableShrink size="2em" />
        </Box>
      </Grow>

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
  );
};

export default () => {
  const classes = useStyles();
  const refs = useContext(RefsContext);
  const handleClick = () => {
    refs.input.current.focus();
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.border}>
        <Tags />
        <InputField />
      </div>
      <Options />
    </div>
  );
};
