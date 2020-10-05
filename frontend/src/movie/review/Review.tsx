import {
  Avatar,
  BoxProps,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ExpandHeight from "../../common/components/ExpandHeight";
import Markdown from "../../common/components/Markdown";
import useBoolean from "../../common/hooks/useBoolean";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";
import CollapsableWrapTypography from "../../common/components/CollapsableWrapTypography";
import ReadMore from "../../common/components/ReadMoreTypography";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import ReadMoreMarkdownTyporgraph from "../../common/components/ReadMoreMarkdownTyporgraph";

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
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.avatar} component="a" href={url}>
          {initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          color: "textSecondary",
        }}
        primary={`${author} · TMDb`}
        secondary={
          <React.Fragment>
            <MarkdownTypography color="textPrimary">
              {content}
            </MarkdownTypography>
          </React.Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
};
