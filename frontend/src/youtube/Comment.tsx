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
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import YouTubeIcon from "@material-ui/icons/YouTube";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import useBoolean from "../common/hooks/useBoolean";
import { youtubeCommentTextToMarkdown } from "./query";
import { YoutubeComment } from "./query/types";

type Props = {
  comment: YoutubeComment;
};

export default ({ comment }: Props) => {
  const isDialogOpen = useBoolean(false);
  const { snippet } = comment;
  const {
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
      <Dialog open={isDialogOpen.value} onClose={isDialogOpen.setFalse}>
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => {
              window.location.href = comment.snippet.authorChannelUrl;
            }}
          >
            Go To Youtube Channel
          </Button>
          <Button
            onClick={() => {
              isDialogOpen.setFalse();
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Dialog>
      <Card>
        <CardHeader
          avatar={
            <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
          }
          title={authorDisplayName}
          subheader="YouTube User"
          action={
            <IconButton onClick={isDialogOpen.setTrue}>
              <MoreVertIcon />
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
          <Box display="flex" alignItems="center">
            <Box marginRight={1} color="text.primary">
              <ThumbUpAltOutlinedIcon
                color="inherit"
                style={{
                  display: "block",
                  fontSize: "1.25em",
                }}
              />
            </Box>

            <Box marginRight={1}>
              <Typography variant="subtitle2" color="textSecondary">
                {formattedLikes}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
