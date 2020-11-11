import {
  Box,
  Button,
  ButtonProps,
  makeStyles,
  SvgIconProps,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import numeral from "numeral";
import React from "react";
import { ReviewAggergation, ReviewVoteValue } from "./query";

export const EditButton = (props: ButtonProps) => {
  return (
    <Button startIcon={<EditIcon />} {...props}>
      Edit
    </Button>
  );
};

export const VoteDownIcon = ({
  review,
  ...props
}: {
  review: ReviewAggergation;
} & SvgIconProps) => {
  return review.reviewVoteValue === ReviewVoteValue.DOWN ? (
    <ThumbDownIcon {...props} />
  ) : (
    <ThumbDownOutlinedIcon {...props} />
  );
};

export const VoteUpIcon = ({
  review,
  ...props
}: {
  review: ReviewAggergation;
} & SvgIconProps) => {
  return review.reviewVoteValue === ReviewVoteValue.UP ? (
    <ThumbUpAltIcon {...props} />
  ) : (
    <ThumbUpAltOutlinedIcon {...props} />
  );
};

export const VoteUpButton = ({
  review,
  ...props
}: { review: ReviewAggergation } & ButtonProps) => {
  return (
    <Button startIcon={<VoteUpIcon review={review} />} {...props}>
      {numeral(review.reviewUpVoteCount).format("0a")}
    </Button>
  );
};

export const VoteDownButton = ({
  review,
  ...props
}: { review: ReviewAggergation } & ButtonProps) => {
  return (
    <Button startIcon={<VoteDownIcon review={review} />} {...props}>
      {numeral(review.reviewDownVoteCount).format("0a")}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  bucket: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: theme.spacing(1 / 2),
    backgroundColor: theme.palette.action.disabledBackground,
  },

  bucketFill: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.action.active,
    height: "100%",
    width: ({ percentage }: { percentage: number }) => `${percentage * 100}%`,
  },
}));

export const ReviewVoteBar = (props: { percentage: number }) => {
  const classes = useStyles(props);

  return (
    <Box className={classes.bucket}>
      <Box className={classes.bucketFill} />
    </Box>
  );
};
