import {
  Avatar,
  Button,
  Chip,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import typeToIcon from "./typeToIcon";

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

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);
  const options = useSelector(chat.selectors.options);

  const onChange = (e, newTags, reason) => {
    dispatch(chat.actions.setTags(newTags));
  };
  const onInputChange = (e, newText) => {
    dispatch(chat.actions.setText(newText));
  };
  const onSend = () => {
    dispatch(chat.actions.sendMessage({ author: "user", tags }));
  };

  const inputRef = useRef();
  const isChatOpen = useSelector(modal.selectors.isOpen("chat"));
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200);
    }
  }, [isChatOpen, inputRef.current]);

  const onFocus = () => {
    document
      .getElementById("chat-messages-bottom")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Paper className={classes.root}>
      <Autocomplete
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
};
