import {
  Avatar,
  Box,
  BoxProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ExpandHeight from "../../common/components/ExpandHeight";
import Markdown from "../../common/components/Markdown";
import useBoolean from "../../common/hooks/useBoolean";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";

const useStyles = makeStyles((theme) => ({
  avatar: {
    textDecoration: "none",
    color: TMDb.palette.primary,
    background: `linear-gradient(${TMDb.palette.tertiary}, ${TMDb.palette.secondary})`,
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
          <Markdown color="textPrimary">{review.content}</Markdown>
        </ExpandHeight>
      </Box>
    </Box>
  );
};
