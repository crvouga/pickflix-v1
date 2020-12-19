import {
  Avatar,
  Box,
  BoxProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ExpandHeight from "../../common/components/ExpandHeight";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import useBoolean from "../../common/hooks/useBoolean";
import { MovieReview } from "../../media/tmdb/types";

const useStyles = makeStyles((theme) => ({
  avatar: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
  },
}));

const toInitials = (fullname: string) =>
  fullname
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substr(0, 2);

interface Props extends BoxProps {
  collapsible: boolean;
  review: MovieReview;
}

export default ({ collapsible, review, ...props }: Props) => {
  const isExpanded = useBoolean(false);
  const classes = useStyles();
  const {
    // id,
    url,
    // content,
    author,
  } = review;
  const initials = toInitials(author);

  return (
    <Box display="flex" flexDirection="row" {...props}>
      <Avatar className={classes.avatar} component="a" href={url}>
        {initials}
      </Avatar>
      <Box paddingLeft={1}>
        <Typography variant="subtitle2" color="textSecondary">
          {author} · TMDb
        </Typography>
        <ExpandHeight
          in={isExpanded.value}
          collapsedHeight="12em"
          onClick={() => isExpanded.toggle()}
        >
          <MarkdownTypography color="textPrimary" source={review.content} />
        </ExpandHeight>
      </Box>
    </Box>
  );
};
