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
import React, { useContext } from "react";
import ChatContext from "./ChatContext";
import typeToIcon from "./typeToIcon";
import useChatInputOptions from "./useChatInputOptions";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

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
  const { text, tags, setText, setTags, sendMessage } = useContext(ChatContext);
  const options = useChatInputOptions(text);

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
        className={classes.autocomplete}
        multiple
        options={options}
        onChange={onChange}
        value={tags}
        inputValue={text}
        onInputChange={onInputChange}
        // onFocus={onFocus}
        // groupBy={R.pipe(R.prop("type"), capitalize)}
        getOptionLabel={R.prop("name")}
        renderTags={renderTags}
        renderOption={renderOption}
        renderInput={renderInput}
      />
      <Button onClick={onSend} color="primary" variant="contained">
        <ArrowUpwardIcon />
      </Button>
    </Paper>
  );
}
