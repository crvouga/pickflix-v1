import { Box, CircularProgress, Fab, Grow, InputBase } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";

export default () => {
  const refs = useContext(RefsContext);

  const status = useSelector(chat.selectors.status);
  const text = useSelector(chat.selectors.text);
  const tags = useSelector(chat.selectors.tags);

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    dispatch(chat.actions.setText(e.target.value));
  };

  const handleSend = () => {
    dispatch(chat.actions.setText(""));
    dispatch(chat.actions.setTags([]));
    dispatch(chat.actions.sendMessage({ author: "user", tags }));
  };

  const handleFocus = () => {};
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
        placeholder="Person, Genre, Decade, Keyword, ..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Grow in={status === "loading"}>
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
