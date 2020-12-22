import {
  Avatar,
  BoxProps,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LaunchIcon from "@material-ui/icons/Launch";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import ResponsiveDialogDrawer from "../../common/components/ResponsiveDialogDrawer";
import useBoolean from "../../common/hooks/useBoolean";
import { nameToInitials } from "../../common/utility";
import { MovieReview } from "../../media/tmdb/types";

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
    color: theme.palette.text.primary,
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
