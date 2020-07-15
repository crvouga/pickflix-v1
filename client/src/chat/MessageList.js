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
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import PosterScroll from "../movie/components/PosterScroll";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";
import typeToIcon from "./typeToIcon";
import useDragCallback from "./useDragCallback";

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
    <div
      {...dragProps}
      ref={refs.messageList}
      className={classes.chatMessagesRoot}
    >
      {messageList.map((message) => (
        <ChatMesssage
          onTagClick={handleTagClick}
          key={message.id}
          {...message}
        />
      ))}
      <div ref={refs.messageListBottom} style={{ marginTop: "100px" }} />
    </div>
  );
};
