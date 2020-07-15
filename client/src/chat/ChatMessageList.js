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
import { useHistory } from "react-router";
import MoviePoster from "../movie/components/Poster";
import ChatContext from "./ChatContext";
import typeToIcon from "./typeToIcon";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import PosterScroll from "../movie/components/PosterScroll";

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

      {movies.length > 0 && <PosterScroll movies={movies} />}
    </div>
  );
};

export default () => {
  const classes = useStyles();
  const chat = useContext(ChatContext);

  const lastMessageId = R.propOr("", "id", R.last(chat.messageList));

  useEffect(() => {
    document
      .getElementById("chat-messages-bottom")
      .scrollIntoView({ behavior: "smooth" });
  }, [lastMessageId]);

  return (
    <div className={classes.chatMessagesRoot}>
      {chat.messageList.length === chat.MESSAGE_CAPACITY && (
        <Typography color="textSecondary" style={{ textAlign: "center" }}>
          Sorry I don't save a lot of messages
        </Typography>
      )}

      {chat.messageList.map((message) => (
        <ChatMesssage key={message.id} {...message} />
      ))}
      <div id="chat-messages-bottom" style={{ marginTop: "100px" }} />
    </div>
  );
};
