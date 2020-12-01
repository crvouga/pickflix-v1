import {
  Box,
  Button,
  ButtonProps,
  makeStyles,
  SvgIconProps,
} from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import numeral from "numeral";
import React from "react";
import { VoteValue } from "../../query/types";

/* 


*/

export const VoteUpIcon = ({
  outlined = true,
  ...props
}: {
  outlined?: boolean;
} & SvgIconProps) => {
  return outlined ? (
    <ThumbUpAltOutlinedIcon {...props} />
  ) : (
    <ThumbUpAltIcon {...props} />
  );
};

export const VoteUpButton = ({
  outlined = true,
  count = 0,
  ...props
}: {
  outlined?: boolean;
  count?: number;
} & ButtonProps) => {
  return (
    <Button
      size="large"
      startIcon={<VoteUpIcon outlined={outlined} />}
      {...props}
    >
      {numeral(count).format("0a")}
    </Button>
  );
};

/* 


*/

export const VoteDownIcon = ({
  outlined = true,
  ...props
}: {
  outlined?: boolean;
} & SvgIconProps) => {
  return outlined ? (
    <ThumbDownOutlinedIcon {...props} />
  ) : (
    <ThumbDownIcon {...props} />
  );
};

export const VoteDownButton = ({
  outlined = true,
  count = 0,
  ...props
}: {
  outlined?: boolean;
  count?: number;
} & ButtonProps) => {
  return (
    <Button
      size="large"
      startIcon={<VoteDownIcon outlined={outlined} />}
      {...props}
    >
      {numeral(count).format("0a")}
    </Button>
  );
};

/* 


*/

export type ReviewVoteActionProps = {
  voteValue: VoteValue | null;
  upVoteCount: number;
  downVoteCount: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
};

export const ReviewVoteActions = ({
  voteValue,
  upVoteCount,
  downVoteCount,
  onVoteUp,
  onVoteDown,
}: ReviewVoteActionProps) => {
  return (
    <React.Fragment>
      <VoteUpButton
        onClick={onVoteUp}
        outlined={voteValue !== VoteValue.UP}
        count={upVoteCount}
      />
      <VoteDownButton
        onClick={onVoteDown}
        outlined={voteValue !== VoteValue.DOWN}
        count={downVoteCount}
      />
    </React.Fragment>
  );
};

/* 


*/

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
