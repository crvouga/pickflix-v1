import {
  Avatar,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Dialog,
  IconButton,
  makeStyles,
  SvgIcon,
  CardContent,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import MarkdownTypography from "../../common/components/MarkdownTypography";
import useBoolean from "../../common/hooks/useBoolean";
import * as TMDb from "../../tmdb/attribution";
import { MovieReview } from "../../tmdb/types";
import { nameToInitials } from "../../utils";
import { TmdbLogo } from "../../tmdb/TMDbAttribution";

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
  const {
    // id,
    url,
    content,
    author,
  } = review;

  return (
    <React.Fragment>
      <Dialog open={isDialogOpen.value} onClose={isDialogOpen.setFalse}>
        <ButtonGroup
          variant="text"
          fullWidth
          size="large"
          orientation="vertical"
        >
          <Button
            onClick={() => {
              window.location.href = url;
            }}
          >
            Go to review
          </Button>
          <Button onClick={isDialogOpen.setFalse}>Cancel</Button>
        </ButtonGroup>
      </Dialog>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{nameToInitials(author)}</Avatar>
          }
          title={author}
          subheader="TMDb User"
          action={
            <IconButton onClick={isDialogOpen.setTrue}>
              <MoreVertIcon />
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
