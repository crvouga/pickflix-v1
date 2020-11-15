import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import MovieAvatar from "../movie/components/MovieAvatar";
import AvatarUser from "../users/AvatarUser";
import { pluralize } from "../utils";
import { ReviewAggergation, ReviewVoteValue } from "./query/types";
import {
  DeleteButton,
  EditButton,
  VoteDownButton,
  VoteUpButton,
} from "./ReviewCardButtons";

type Props = {
  review: ReviewAggergation;
  showUser?: boolean;
  showMedia?: boolean;
  onVoteUp?: () => void;
  onVoteDown?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

export default ({
  review,
  showUser,
  showMedia,
  onVoteUp,
  onVoteDown,
  onEdit,
  onDelete,
}: Props) => {
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

        <Typography style={{ wordBreak: "break-word" }} variant="body1">
          {review.review.content}
        </Typography>
      </CardContent>
      <CardActions>
        {onEdit && <EditButton onClick={onEdit} />}
        {onDelete && <DeleteButton onClick={onDelete} />}
        {onVoteUp && (
          <VoteUpButton
            onClick={onVoteUp}
            outlined={review.reviewVoteValue !== ReviewVoteValue.UP}
            count={review.reviewUpVoteCount}
          />
        )}
        {onVoteDown && (
          <VoteDownButton
            onClick={onVoteDown}
            outlined={review.reviewVoteValue !== ReviewVoteValue.DOWN}
            count={review.reviewVoteCount - review.reviewUpVoteCount}
          />
        )}
      </CardActions>
    </Card>
  );
};
