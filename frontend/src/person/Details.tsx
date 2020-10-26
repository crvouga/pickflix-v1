import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useBoolean from "../common/hooks/useBoolean";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import {
  PersonDetailsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
} from "../tmdb/types";
import PersonImageGalleryDialog from "./PersonImageGalleryDialog";

interface Props {
  details: PersonDetailsResponse;
  credits: PersonMovieCreditsResponse;
  images: PersonImagesResponse;
}

const AVATAR_SIZE = 144;

const useStyles = makeStyles((theme) => ({
  root: {
    //
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  avatar: {
    boxSizing: "content-box",
    border: `solid ${theme.spacing(1 / 2)}px ${
      theme.palette.background.default
    }`,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginTop: -AVATAR_SIZE / 2,
  },
}));

export default (props: Props) => {
  const makeImageUrl = useMakeImageUrl();

  const { details, images } = props;
  const classes = useStyles();

  const isImageGalleryDialogOpen = useBoolean(false);

  return (
    <div className={classes.root}>
      <PersonImageGalleryDialog
        images={images}
        open={isImageGalleryDialogOpen.value}
        onClose={isImageGalleryDialogOpen.setFalse}
      />
      <div className={classes.avatarContainer}>
        <Avatar
          onClick={isImageGalleryDialogOpen.setTrue}
          className={classes.avatar}
          src={makeImageUrl(4, details)}
        />
      </div>
      <Typography align="center" variant="h5" style={{ fontWeight: "bold" }}>
        {details.name}
      </Typography>
      {/* <Box paddingX={2}>
        <Typography style={{ fontWeight: "bold" }}>Biography</Typography>
        <ReadMore text={details.biography} color="textSecondary" />
      </Box> */}
    </div>
  );
};
