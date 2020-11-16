import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  CircularProgress,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { ZoomIn } from "../../common/components/TransitionComponents";
import useModal from "../../navigation/modals/useModal";
import useSnackbar from "../../snackbar/useSnackbar";
import useDeleteReviewForm from "./useDeleteReviewForm";
import useBoolean from "../../common/hooks/useBoolean";

const LoadingDialog = () => {
  const deleteReviewForm = useDeleteReviewForm();
  const open = useBoolean(false);
  useEffect(() => {
    const unlistenSubmit = deleteReviewForm.eventTarget.on("submit", () => {
      open.setTrue();
    });
    const unlistenSubmitSuccess = deleteReviewForm.eventTarget.on(
      "submitSuccess",
      () => {
        open.setFalse();
      }
    );
    return () => {
      unlistenSubmit();
      unlistenSubmitSuccess();
    };
  }, []);
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

  useEffect(() => {
    const unlisten = deleteReviewForm.eventTarget.on("submitSuccess", () => {
      deleteReviewFormModal.close();
      snackbar.display({
        message: "Deleted review",
      });
    });
    return () => {
      unlisten();
    };
  }, []);

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
        <Button variant="text" size="large" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" size="large" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
