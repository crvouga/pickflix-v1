import {
  Avatar,
  Chip,
  makeStyles,
  Paper,
  Slide,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import PosterScroll from "../movie/components/PosterScroll";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import typeToIcon from "./typeToIcon";
import { motion } from "framer-motion";
import useBoolean from "../common/hooks/useBoolean";
const useStyles = makeStyles((theme) => ({
  chatMessagesRoot: {
    flex: 1,
    overflowY: "auto",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },

  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
  },

  bubble: {
    maxWidth: "80%",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: theme.spacing(4),
  },

  bubbleLeft: {
    borderBottomLeftRadius: 0,
  },

  bubbleRight: {
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.info.dark,
  },

  messageRight: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row-reverse",
  },

  messageLeft: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  message: {
    height: (movies) => (movies.length > 0 ? "200px" : "auto"),
  },
}));

const ChatMesssage = ({
  onTagClick = () => {},
  author = undefined,
  text = "",
  tags = [],
  movies = [],
}) => {
  const classes = useStyles({ movies });

  const className =
    author === "user" ? classes.messageRight : classes.messageLeft;

  const bubbleClassName = clsx(
    classes.bubble,
    author === "user" ? classes.bubbleRight : classes.bubbleLeft
  );

  const direction = author === "user" ? "left" : "right";

  return (
    <div className={classes.message}>
      <Slide in direction={direction}>
        <div className={className}>
          <Paper className={bubbleClassName}>
            <Typography variant="subtitle1">{text}</Typography>
            {tags.map((tag) => (
              <Chip
                onClick={() => onTagClick(tag)}
                key={tag.id}
                avatar={
                  <Avatar src={makeTMDbImageURL(2, tag)}>
                    {typeToIcon(tag.type)}
                  </Avatar>
                }
                label={tag.name}
              />
            ))}
          </Paper>
        </div>
      </Slide>

      {movies.length > 0 && (
        <PosterScroll
          movies={movies}
          PosterProps={{ minWidth: 120, maxWidth: 120, marginRight: 1 }}
        />
      )}
    </div>
  );
};

export default () => {
  const classes = useStyles();
  const messageList = useSelector(chat.selectors.messageList);
  const lastMessageId = R.propOr("", "id", R.last(messageList));
  const dispatch = useDispatch();
  const tags = useSelector(chat.selectors.tags);
  const handleTagClick = (tag) => {
    const newTags = R.union([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };

  useEffect(() => {
    document
      .getElementById("chat-messages-bottom")
      .scrollIntoView({ behavior: "smooth" });
  }, [lastMessageId]);

  const isChatModalOpen = useSelector(modal.selectors.isOpen("chat"));
  useEffect(() => {
    if (isChatModalOpen) {
      document.getElementById("chat-messages-bottom").scrollIntoView();
    }
  }, [isChatModalOpen]);

  const focused = useSelector(chat.selectors.focused);
  useEffect(() => {
    if (focused) {
      document
        .getElementById("chat-messages-bottom")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [focused]);

  const touching = useBoolean(false);
  const [previousScrollTop, setPreviousScrollTop] = useState(0);
  const handleScroll = (e) => {
    const newScrollTop = e.currentTarget.scrollTop;
    if (previousScrollTop > newScrollTop) {
      // console.log("scroll up");
      if (touching.value) {
        // console.log("drag up");
        dispatch(chat.actions.setFocus(false));
      }
    } else {
      // console.log("scroll down");
    }
    setPreviousScrollTop(newScrollTop);
  };

  return (
    <div
      onTouchStart={touching.setTrue}
      onTouchEnd={touching.setFalse}
      onScroll={handleScroll}
      className={classes.chatMessagesRoot}
    >
      {R.takeLast(25, messageList).map((message) => (
        <ChatMesssage
          onTagClick={handleTagClick}
          key={message.id}
          {...message}
        />
      ))}
      <div id="chat-messages-bottom" style={{ marginTop: "100px" }} />
    </div>
  );
};
