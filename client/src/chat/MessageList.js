import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";

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

  const handleTagClick = (tag, e) => {
    const newTags = R.union([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };

  const blur = () => {
    refs.input.current.blur();
  };

  return (
    <div onTouchStart={blur} ref={refs.messageList}>
      {messageList.map((message) => (
        <Message
          key={message.id}
          message={message}
          onTagClick={handleTagClick}
        />
      ))}
      <div ref={refs.messageListBottom} />
    </div>
  );
};
