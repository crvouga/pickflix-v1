import {
  Avatar,
  Box,
  Button,
  Chip,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  InputBase,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as R from "ramda";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import modal from "../common/redux/modal";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import ChatContext from "./ChatContext";
import typeToIcon from "./typeToIcon";
import useChatInputOptions from "./useChatInputOptions";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  autocomplete: {
    flex: 1,
  },
  suggestions: {
    height: "360px",
  },
  button: {},
  textField: {
    borderRadius: theme.spacing(5),
  },
}));

const renderOption = (option, props) => {
  return (
    <React.Fragment>
      {option.logoPath ? (
        <img src={makeTMDbImageURL(1, option)} style={{ marginRight: 12 }} />
      ) : (
        <ListItemAvatar>
          <Avatar src={makeTMDbImageURL(1, option)}>
            {typeToIcon(option.type)}
          </Avatar>
        </ListItemAvatar>
      )}

      <ListItemText primary={option.name} secondary={option.type} />
    </React.Fragment>
  );
};

const renderInput = (params) => {
  return (
    <TextField
      {...params}
      autoFocus
      variant="outlined"
      color="primary"
      label="Movie Data..."
    />
  );
};

const renderTag = (tag, props) => (
  <Chip
    key={tag.name}
    {...props}
    size="small"
    label={tag.name}
    avatar={
      <Avatar src={makeTMDbImageURL(2, tag)}>{typeToIcon(tag.type)}</Avatar>
    }
  />
);

const renderTags = (tags, getTagProps) =>
  tags.map((tag, index) => renderTag(tag, getTagProps({ ...tag, index })));

export default function ChatInput() {
  const classes = useStyles();
  const { text, tags, setText, setTags, sendMessage, isLoading } = useContext(
    ChatContext
  );

  const options = useChatInputOptions(text);
  const inputRef = useRef();
  const isChatOpen = useSelector(modal.selectors.isOpen("chat"));
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200);
    }
  }, [isChatOpen, inputRef.current]);
  const onChange = (e, newTags, reason) => {
    setTags(newTags);
  };
  const onInputChange = (e, newText) => {
    setText(newText);
  };

  const onSend = () => {
    sendMessage({ author: "user", tags });
  };

  const onFocus = () => {
    document
      .getElementById("chat-messages-bottom")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Paper className={classes.root}>
      <Autocomplete
        loading={isLoading}
        openOnFocus
        className={classes.autocomplete}
        multiple
        options={options}
        onChange={onChange}
        value={tags}
        inputValue={text}
        onInputChange={onInputChange}
        onFocus={onFocus}
        // groupBy={R.pipe(R.prop("type"), capitalize)}
        getOptionLabel={R.prop("name")}
        renderTags={renderTags}
        renderOption={renderOption}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              inputRef={inputRef}
              autoFocus
              variant="outlined"
              color="primary"
              label="Movie Data..."
            />
          );
        }}
      />
      <Button onClick={onSend} color="primary" variant="contained">
        <ArrowUpwardIcon />
      </Button>
    </Paper>
  );
}
