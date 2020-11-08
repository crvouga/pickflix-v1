import {
  Dialog,
  makeStyles,
  useMediaQuery,
  useTheme,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";
import useModal from "../navigation/modals/useModal";
import AddOrEditReview from "./AddOrEditReview";
import ChooseMedia from "./ChooseMedia";
import useReviewForm from "./hooks/useReviewForm";
import useBoolean from "../common/hooks/useBoolean";
import { useQuery } from "react-query";
import { queryKeys, PostReviewParams } from "./query";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: "auto",
      width: "480px",
      maxHeight: "720px",
    },
  },
}));

export default () => {
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");
  const isConformationDialogOpen = useBoolean(false);

  const handleCancel = () => {
    if (reviewForm.tmdbMedia) {
      isConformationDialogOpen.setTrue();
    } else {
      reviewFormModal.close();
    }
  };

  const handleDiscard = () => {
    isConformationDialogOpen.setFalse();
    reviewFormModal.close();
    reviewForm.setTmdbMedia(undefined);
  };

  const handleSubmit = async (params: PostReviewParams) => {
    try {
      await reviewForm.submit(params);
      reviewFormModal.close();
      reviewForm.setTmdbMedia(undefined);
    } catch (error) {}
  };

  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={isMobile}
        classes={classesDialog}
        open={reviewFormModal.isOpen}
        onClose={handleCancel}
        transitionDuration={0}
      >
        {reviewForm.tmdbMedia ? (
          <AddOrEditReview
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            tmdbMedia={reviewForm.tmdbMedia}
          />
        ) : (
          <ChooseMedia
            onSubmit={reviewForm.setTmdbMedia}
            onCancel={handleCancel}
          />
        )}
      </Dialog>
      <Dialog
        open={isConformationDialogOpen.value}
        onClose={isConformationDialogOpen.setFalse}
      >
        <DialogTitle>Discard Review?</DialogTitle>
        <DialogActions>
          <Button>Cancel</Button>
          <Button onClick={handleDiscard}>Discard</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
