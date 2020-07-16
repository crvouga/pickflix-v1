import { Box, makeStyles } from "@material-ui/core";
import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import Message from "./Message";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";
import useDragCallback from "./useDragCallback";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const useMessageListScrollBehavior = () => {
  const refs = useContext(RefsContext);
  const isChatModalOpen = useSelector(modal.selectors.isOpen("chat"));
  const latestMessage = useSelector(chat.selectors.latestMessage);

  useEffect(() => {
    if (refs.messageListBottom.current) {
      refs.messageListBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestMessage?.id]);

  useEffect(() => {
    if (isChatModalOpen && refs.messageListBottom.current) {
      refs.messageListBottom.current.scrollIntoView();
    }
  }, [isChatModalOpen]);
};

export default () => {
  useMessageListScrollBehavior();
  const classes = useStyles();
  const refs = useContext(RefsContext);

  const tags = useSelector(chat.selectors.tags);
  const messageList = useSelector(chat.selectors.messageList);
  const dispatch = useDispatch();

  const handleTagClick = (tag) => {
    refs.input.current.focus();
    const newTags = R.union([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };

  const dragProps = useDragCallback({
    onDragUp: () => {
      refs.input.current.blur();
    },
  });

  return (
    <Box
      {...dragProps}
      ref={refs.messageList}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      style={{ overflowY: "scroll" }}
      bgcolor="background.default"
    >
      <div className={classes.toolbar} />
      {messageList.map((message) => (
        <Message onTagClick={handleTagClick} key={message.id} {...message} />
      ))}
      <Box height="150px" />
      <div ref={refs.messageListBottom} />
    </Box>
  );
};
