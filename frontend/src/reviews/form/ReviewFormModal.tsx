import { Dialog, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import useModal from "../../navigation/modals/useModal";
import ReviewForm from "./ReviewForm";
import useReviewForm from "./useReviewForm";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
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

  const handleClose = () => {
    reviewFormModal.close();
  };

  useEffect(() => {
    const unlisten = reviewForm.eventTarget.on("submitSuccess", () => {
      reviewFormModal.close();
    });
    return () => {
      unlisten();
    };
  }, []);

  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullScreen={isMobile}
      classes={classesDialog}
      open={reviewFormModal.isOpen}
      onClose={handleClose}
      transitionDuration={0}
    >
      <ReviewForm onCancel={handleClose} />
    </Dialog>
  );
};
