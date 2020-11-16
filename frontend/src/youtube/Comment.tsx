import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Typography,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import YouTubeIcon from "@material-ui/icons/YouTube";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import useBoolean from "../common/hooks/useBoolean";
import { youtubeCommentTextToMarkdown } from "./query";
import { YoutubeComment } from "./query/types";
import LaunchIcon from "@material-ui/icons/Launch";
import CloseIcon from "@material-ui/icons/Close";
import ResponsiveDialogDrawer from "../common/components/ResponsiveDialogDrawer";

const YoutubeCommentOptionsList = ({
  onSeeChannel,
  onCancel,
}: {
  onSeeChannel: () => void;
  onCancel: () => void;
}) => {
  return (
    <List>
      <ListItem button onClick={onSeeChannel}>
        <ListItemIcon>
          <LaunchIcon />
        </ListItemIcon>
        <ListItemText primary="Go to YouTube channel" />
      </ListItem>
      <ListItem button onClick={onCancel}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText primary="Cancel" />
      </ListItem>
    </List>
  );
};

type Props = {
  comment: YoutubeComment;
};

export default ({ comment }: Props) => {
  const isDialogOpen = useBoolean(false);
  const { snippet } = comment;
  const {
    authorChannelUrl,
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
  } = snippet;

  const formattedLikes = numeral(likeCount).format("0.0a").replace(".0", "");
  const formattedPublishedAt = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ");

  const handleAvatarClick = () => {};

  const textDisplayMarkdown = youtubeCommentTextToMarkdown(textDisplay);

  return (
    <React.Fragment>
      <ResponsiveDialogDrawer
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      >
        <YoutubeCommentOptionsList
          onSeeChannel={() => {
            window.location.href = authorChannelUrl;
            isDialogOpen.setFalse();
          }}
          onCancel={() => {
            isDialogOpen.setFalse();
          }}
        />
      </ResponsiveDialogDrawer>
      <Card>
        <CardHeader
          avatar={
            <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
          }
          title={authorDisplayName}
          subheader="YouTube User"
          action={
            <IconButton onClick={isDialogOpen.setTrue}>
              <MoreHorizIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Box paddingBottom={1}>
            <Typography variant="subtitle2" color="textSecondary">
              {formattedPublishedAt}
            </Typography>
          </Box>
          <Box paddingBottom={1}>
            <Typography variant="body1">{textDisplayMarkdown}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            disableRipple
            disableFocusRipple
            disableElevation
            disableTouchRipple
            size="large"
            startIcon={<ThumbUpAltOutlinedIcon />}
          >
            {formattedLikes}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
