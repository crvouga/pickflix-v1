import {
  Avatar,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import useBoolean from "../../common/hooks/useBoolean";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";
import { nameToInitials } from "../../utils";
import ResponsiveDialogDrawer from "../../common/components/ResponsiveDialogDrawer";
import LaunchIcon from "@material-ui/icons/Launch";
import CloseIcon from "@material-ui/icons/Close";

const TmdbReviewOptionsList = ({
  onSeeReview,
  onCancel,
}: {
  onSeeReview: () => void;
  onCancel: () => void;
}) => {
  return (
    <List>
      <ListItem button onClick={onSeeReview}>
        <ListItemIcon>
          <LaunchIcon />
        </ListItemIcon>
        <ListItemText primary="Go to review" />
      </ListItem>
      <ListItem button onClick={onCancel}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText primary="Cancel" />
      </ListItem>
    </List>
  );
};

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
  const isDialogOpen = useBoolean(false);
  const { url, content, author } = review;

  return (
    <React.Fragment>
      <ResponsiveDialogDrawer
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      >
        <TmdbReviewOptionsList
          onSeeReview={() => {
            window.location.href = url;
            isDialogOpen.setFalse();
          }}
          onCancel={() => {
            isDialogOpen.setFalse();
          }}
        />
      </ResponsiveDialogDrawer>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{nameToInitials(author)}</Avatar>
          }
          title={author}
          subheader="TMDb User"
          action={
            <IconButton onClick={isDialogOpen.setTrue}>
              <MoreHorizIcon />
            </IconButton>
          }
        />

        <CardContent>
          <MarkdownTypography>{content}</MarkdownTypography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
