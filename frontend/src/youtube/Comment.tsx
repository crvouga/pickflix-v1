import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import ReadMore from "../common/components/ReadMore";
import * as youtubeAPI from "./api";
import { YoutubeComment } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
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

interface Props {
  comment: YoutubeComment;
}

export default ({ comment }: Props) => {
  const {
    // kind,
    // etag,
    // id,
    snippet,
  } = comment;
  const {
    authorDisplayName,
    authorProfileImageUrl,
    // authorChannelUrl,
    // authorChannelId,
    // channelId,
    // videoId,
    textDisplay,
    // textOriginal,
    // parentId,
    // canRate,
    // viewerRating,
    likeCount,
    // moderationStatus,
    publishedAt,
    // updatedAt,
  } = snippet;

  const classes = useStyles();

  const formattedLikes = numeral(likeCount).format("0.0a").replace(".0", "");
  const formattedPublishedAt = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ");

  const subtitle1 = `${authorDisplayName} • ${formattedPublishedAt}`;

  const handleAvatarClick = () => {};

  const textDisplayMarkdown = youtubeAPI.youtbeCommentTextToMarkdown(
    textDisplay
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textSecondary",
        }}
        primary={subtitle1}
        secondaryTypographyProps={{
          variant: "body1",
          color: "textPrimary",
        }}
        secondary={
          <div>
            <ReadMore text={textDisplayMarkdown} />
            <div className={classes.actions}>
              {likeCount > 0 && (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </div>
          </div>
        }
      />
    </ListItem>
  );
};
