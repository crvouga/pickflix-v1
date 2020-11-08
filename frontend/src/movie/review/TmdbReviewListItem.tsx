import {
  Avatar,
  Box,
  BoxProps,
  Card,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";
import { nameToInitials } from "../../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    textDecoration: "none",
    color: TMDb.palette.primary,
    background: `linear-gradient(${TMDb.palette.tertiary}, ${TMDb.palette.secondary})`,
  },
}));

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

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>{nameToInitials(author)}</Avatar>
        }
        title={author}
      />
      <Box paddingX={2} paddingBottom={2}>
        <MarkdownTypography>{content}</MarkdownTypography>
      </Box>
    </Card>
  );
};
