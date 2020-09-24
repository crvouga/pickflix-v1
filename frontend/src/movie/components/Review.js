import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import ExpandHeight from "../../common/components/ExpandHeight";
import Markdown from "../../common/components/Markdown";
import useBoolean from "../../common/hooks/useBoolean";
import * as TMDb from "../../tmdb/attribution";

const useStyles = makeStyles((theme) => ({
  avatar: {
    textDecoration: "none",
    color: TMDb.palette.primary,
    background: `linear-gradient(${TMDb.palette.tertiary}, ${TMDb.palette.secondary})`,
  },
}));

const toInitials = (fullname) =>
  R.pipe(R.split(" "), R.pluck(0), R.join(""), R.toUpper, R.take(2))(fullname);

export default ({ collapsible, review, ...props }) => {
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
          onClick={isExpanded.toggle}
          collapsedHeight="12em"
        >
          <Markdown color="textPrimary">{review.content}</Markdown>
        </ExpandHeight>
      </Box>
    </Box>
  );
};
