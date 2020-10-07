import { Avatar, BoxProps, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ReadMore from "../../common/components/ReadMore";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    padding: theme.spacing(2),
  },
  avatarContainer: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    textDecoration: "none",
    color: TMDb.palette.primary,
    background: `linear-gradient(${TMDb.palette.tertiary}, ${TMDb.palette.secondary})`,
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
}));

const toInitials = (fullname: string) =>
  fullname
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substr(0, 2);

type Props = BoxProps & {
  review: MovieReview;
};

export default ({ review, ...props }: Props) => {
  const classes = useStyles();
  const {
    // id,
    url,
    content,
    author,
  } = review;
  const initials = toInitials(author);

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar className={classes.avatar} component="a" href={url}>
          {initials}
        </Avatar>
      </div>
      <div className={classes.body}>
        <Typography color="textSecondary">{author}</Typography>
        <ReadMore TypographyProps={{ color: "textPrimary" }} text={content} />
      </div>
    </div>
  );
};
