import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardHeaderProps,
  IconButton,
  IconButtonProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import useBoolean from "../../common/hooks/useBoolean";
import { pluralize } from "../../common/utility";
import MovieAvatar from "../../movie/components/MovieAvatar";
import AvatarUser from "../../user/components/AvatarUser";
import { makeUserPageRoute } from "../../user/UserPage";
import { ReviewAggergation } from "../query/types";
import {
  ReviewVoteActionProps,
  ReviewVoteActions,
} from "../form/vote/ReviewVoteActions";
import {
  ReviewActionsModal,
  ReviewActionsProps,
} from "./review-actions/ReviewActions";

export type ReviewCardProps = {
  review: ReviewAggergation;
  showAuthor?: boolean;
  showMedia?: boolean;
  noWrap?: boolean;

  ReviewActionsProps?: ReviewActionsProps;
  ReviewVoteActionProps?: ReviewVoteActionProps;
};

const MoreButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <MoreHorizIcon />
    </IconButton>
  );
};

export const CardHeaderAuthor = ({
  review,
  CardHeaderProps,
}: ReviewCardProps & {
  CardHeaderProps?: CardHeaderProps;
}) => {
  const history = useHistory();

  return (
    <CardHeader
      onClick={() => {
        history.push(makeUserPageRoute({ userId: review.author.id }));
      }}
      avatar={<AvatarUser user={review.author} />}
      title={review.author.username}
      subheader={pluralize(review.authorReviewCount, "review")}
      {...CardHeaderProps}
    />
  );
};

const useStylesCardHeader = makeStyles(() => ({
  //EXPLANATION: https://stackoverflow.com/questions/59356314/how-apply-ellipsis-to-title-in-material-ui-cardheader
  content: {
    flex: "1 1 auto",
    width: "100%",
    minWidth: 0,
  },
}));

export const CardHeaderMedia = ({
  review,
  noWrap,
  CardHeaderProps,
}: ReviewCardProps & {
  CardHeaderProps?: CardHeaderProps;
}) => {
  const classesCardHeader = useStylesCardHeader();
  const history = useHistory();

  return (
    <CardHeader
      classes={classesCardHeader}
      onClick={() => {
        history.push(
          `/${review.review.mediaId.tmdbMediaType}/${review.review.mediaId.tmdbMediaId}`
        );
      }}
      titleTypographyProps={{ noWrap }}
      avatar={<MovieAvatar movie={review.tmdbData} />}
      title={review.tmdbData.title}
      subheader={pluralize(review.mediaReviewCount, "review")}
      {...CardHeaderProps}
    />
  );
};

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

const ReviewCardContent = ({ noWrap, review }: ReviewCardProps) => {
  return (
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

      <Box minHeight="2em">
        <Typography
          noWrap={noWrap}
          style={{ wordBreak: "break-word" }}
          variant="body1"
        >
          {review.review.content}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default (props: ReviewCardProps) => {
  const {
    showMedia,
    showAuthor,
    ReviewActionsProps,
    ReviewVoteActionProps,
  } = props;

  const isReviewOptionsOpen = useBoolean(false);

  const CardHeaderProps = {
    action: ReviewActionsProps && (
      <MoreButton
        onClick={(event) => {
          event.stopPropagation();
          isReviewOptionsOpen.setTrue();
        }}
      />
    ),
  };

  const onClose = () => {
    isReviewOptionsOpen.setFalse();
  };

  return (
    <React.Fragment>
      <ReviewActionsModal
        open={isReviewOptionsOpen.value}
        onClose={onClose}
        ReviewActionsProps={ReviewActionsProps}
      />
      <Card>
        {showMedia && (
          <CardHeaderMedia CardHeaderProps={CardHeaderProps} {...props} />
        )}
        {showAuthor && (
          <CardHeaderAuthor CardHeaderProps={CardHeaderProps} {...props} />
        )}
        <ReviewCardContent {...props} />
        <CardActions>
          {ReviewVoteActionProps && (
            <ReviewVoteActions {...ReviewVoteActionProps} />
          )}
        </CardActions>
      </Card>
    </React.Fragment>
  );
};
