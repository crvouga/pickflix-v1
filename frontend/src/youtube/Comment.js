import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import * as youtubeAPI from "./api";
import Markdown from "../common/components/Markdown";
import ExpandHeight from "../common/components/ExpandHeight";
import useBoolean from "../common/hooks/useBoolean";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "row",
    maxWidth: "100vw",
  },
  avatar: {
    paddingRight: theme.spacing(1),
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    color: theme.palette.text.secondary,
  },
  iconButton: {
    marginLeft: -theme.spacing(1),
  },
  icon: {
    width: "0.7em",
    height: "0.7em",
  },
  likeCount: {
    marginTop: "0.75em",
    marginLeft: "-0.5em",
  },
  subtitle1: {
    wordBreak: "break-word",
  },
}));

export default ({ comment }) => {
  const {
    kind,
    etag,
    id,
    snippet: {
      authorDisplayName,
      authorProfileImageUrl,
      authorChannelUrl,
      authorChannelId: { value },
      channelId,
      videoId,
      textDisplay,
      textOriginal,
      parentId,
      canRate,
      viewerRating,
      likeCount,
      moderationStatus,
      publishedAt,
      updatedAt,
    },
  } = comment;

  const classes = useStyles();

  const formattedLikes = numeral(likeCount).format("0.0a").replace(".0", "");
  const formattedPublishedAt = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ");
  const isEdited = updatedAt !== publishedAt;
  const subtitle1 = `${authorDisplayName} • ${formattedPublishedAt}`;

  const handleAvatarClick = () => {};

  const source = youtubeAPI.youtbeCommentTextToMarkdown(textDisplay);

  const isExpanded = useBoolean(false);

  return (
    <div className={classes.root}>
      <div className={classes.avatar}>
        <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
      </div>
      <div>
        <Typography
          className={classes.subtitle1}
          variant="subtitle2"
          color="textSecondary"
        >
          {subtitle1}
        </Typography>
        <ExpandHeight
          collapsedHeight="10em"
          in={isExpanded.value}
          onClick={isExpanded.toggle}
        >
          <Markdown source={source} color="textPrimary" />
        </ExpandHeight>
        <div className={classes.actions}>
          <IconButton className={classes.iconButton} color="inherit">
            <ThumbUpIcon className={classes.icon} />
          </IconButton>
          <Typography
            variant="subtitle2"
            className={classes.likeCount}
            color="inherit"
          >
            {formattedLikes}
          </Typography>
        </div>
      </div>
    </div>
  );
};
