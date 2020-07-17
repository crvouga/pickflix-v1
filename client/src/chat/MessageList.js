import { Box } from "@material-ui/core";
import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";
import useDragCallback from "./useDragCallback";

export default () => {
  const refs = useContext(RefsContext);

  const tags = useSelector(chat.selectors.tags);
  const messageList = useSelector(chat.selectors.messageList);
  const latestMessage = useSelector(chat.selectors.latestMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refs.messageListBottom.current) {
      refs.messageListBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestMessage?.id]);

  const dragProps = useDragCallback({
    onDragUp: () => {
      refs.input.current.blur();
    },
  });

  const handleTagClick = (tag) => {
    refs.input.current.focus();
    const newTags = R.union([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };

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
      {messageList.map((message) => (
        <Message
          key={message.id}
          message={message}
          onTagClick={handleTagClick}
        />
      ))}
      <Box height="150px" />
      <div ref={refs.messageListBottom} />
    </Box>
  );
};
