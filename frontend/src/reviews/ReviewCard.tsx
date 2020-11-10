import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardProps,
  Typography,
  CardContent,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { ReviewAggergation } from "./query/types";
import AvatarUser from "../users/AvatarUser";
import MovieAvatar from "../movie/components/MovieAvatar";
import { pluralize } from "../utils";

type Props = {
  review: ReviewAggergation;
  showUser?: boolean;
  showMedia?: boolean;
};

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

export default ({ review, showUser, showMedia }: Props) => {
  const history = useHistory();
  return (
    <Card>
      {showMedia && (
        <CardActionArea
          onClick={() => {
            history.push(`/movie/${review.tmdbData.id}`);
          }}
        >
          <CardHeader
            avatar={<MovieAvatar movie={review.tmdbData} />}
            title={review.tmdbData.title}
            subheader={pluralize(review.mediaReviewCount, "review")}
          />
        </CardActionArea>
      )}
      {showUser && (
        <CardActionArea
          onClick={() => {
            history.push(`/user/${review.author.username}`);
          }}
        >
          <CardHeader
            avatar={<AvatarUser user={review.author} />}
            title={review.author.username}
            subheader={pluralize(review.authorReviewCount, "review")}
          />
        </CardActionArea>
      )}
      <CardContent>
        <Box display="flex" alignItems="center" paddingBottom={1}>
          <Box marginRight={1}>
            <Rating
              precision={0.5}
              value={review.review.rating}
              readOnly
              size="small"
            />
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {toPublishedAt(new Date(review.review.createdAt))}
          </Typography>
        </Box>
        <Typography variant="h6">{review.review.title}</Typography>
        <Typography variant="body2">{review.review.content}</Typography>
      </CardContent>
    </Card>
  );
};
