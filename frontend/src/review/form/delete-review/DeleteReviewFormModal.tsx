import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import useModal from "../../../app/modals/useModal";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import useDeleteReviewForm from "./useDeleteReviewForm";

const LoadingDialog = () => {
  const deleteReviewForm = useDeleteReviewForm();
  const open = useBoolean(false);

  useListener(deleteReviewForm.eventEmitter, "submit", open.setTrue);
  useListener(deleteReviewForm.eventEmitter, "submitSettled", open.setFalse);

  return (
    <Dialog open={open.value}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CircularProgress disableShrink />
          </ListItemIcon>
          <ListItemText primary="Deleting" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default () => {
  const deleteReviewForm = useDeleteReviewForm();
  const deleteReviewFormModal = useModal("DeleteReviewForm");
  const snackbar = useSnackbar();

  useListener(deleteReviewForm.eventEmitter, "submitSuccess", () => {
    deleteReviewFormModal.close();
    snackbar.display({
      message: "Deleted review",
    });
  });

  const handleCancel = () => {
    deleteReviewForm.setReviewId(undefined);
    deleteReviewFormModal.close();
  };

  const handleSubmit = () => {
    if (deleteReviewForm.reviewId) {
      deleteReviewForm.submit({ reviewId: deleteReviewForm.reviewId });
    }
  };

  return (
    <Dialog
      TransitionComponent={ZoomIn}
      open={deleteReviewFormModal.isOpen}
      onClose={deleteReviewFormModal.close}
    >
      <LoadingDialog />
      <DialogTitle>Delete Review?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="large" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
