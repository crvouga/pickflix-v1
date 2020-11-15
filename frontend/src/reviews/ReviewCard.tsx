import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import MovieAvatar from "../movie/components/MovieAvatar";
import AvatarUser from "../users/AvatarUser";
import { pluralize } from "../utils";
import { ReviewAggergation, ReviewVoteValue } from "./query/types";
import { EditButton, VoteDownButton, VoteUpButton } from "./ReviewCardButtons";
import ListItemSkeleton from "../common/components/ListItemSkeleton";

type Props = {
  review: ReviewAggergation;
  showUser?: boolean;
  showMedia?: boolean;
  onVoteUp?: () => void;
  onVoteDown?: () => void;
  onEdit?: () => void;
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

const ICON_BUTTON_DIAMETER = "32px";

const IconButtonSkeleton = () => {
  return (
    <Box p={1}>
      <Skeleton
        variant="circle"
        width={ICON_BUTTON_DIAMETER}
        height={ICON_BUTTON_DIAMETER}
      />
    </Box>
  );
};

export const ReviewCardSkeleton = ({
  showUser = false,
  showMedia = false,
  iconButtonCount = 0,
}: {
  showUser?: boolean;
  showMedia?: boolean;
  iconButtonCount?: number;
}) => {
  return (
    <Card>
      {showMedia && <ListItemSkeleton avatarShape="rect" />}
      {showUser && <ListItemSkeleton />}
      <CardContent>
        <Box display="flex" alignItems="center" paddingBottom={1}>
          <Skeleton variant="rect" width="8em" height="1em" />
        </Box>

        <Box width="100%" maxWidth="240px">
          <Skeleton variant="text" width="100%" height="3em" />
        </Box>
      </CardContent>
      <CardActions>
        {[...Array(iconButtonCount)].map((_, index) => (
          <IconButtonSkeleton key={index} />
        ))}
      </CardActions>
    </Card>
  );
};
