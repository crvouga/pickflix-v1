import { Avatar, Box, Card, CardHeader, Typography } from "@material-ui/core";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import { youtubeCommentTextToMarkdown } from "./query";
import { YoutubeComment } from "./query/types";

type Props = {
  comment: YoutubeComment;
};

export default ({ comment }: Props) => {
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
    <Card>
      <CardHeader
        avatar={
          <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
        }
        title={authorDisplayName}
        subheader={`${formattedPublishedAt} · ${formattedLikes} likes`}
      />
      <Box padding={2} paddingTop={0}>
        <Typography variant="body1">{textDisplayMarkdown}</Typography>
      </Box>
    </Card>
  );
};
