import { Dialog, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { SlideUp } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import { useListener } from "../../../utils";
import ReviewForm from "./ReviewForm";
import useReviewForm from "./useReviewForm";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: "auto",
      width: "480px",
      maxHeight: "720px",
    },
    [theme.breakpoints.down("xs")]: {
      top: 0,
      left: 0,
      margin: 0,
      marginBottom: "auto",
      minWidth: "100vw",
    },
  },
}));

export default () => {
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");

  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    reviewFormModal.close();
  });

  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      TransitionComponent={SlideUp}
      // fullScreen={isMobile}
      classes={classesDialog}
      open={reviewFormModal.isOpen}
      onClose={reviewFormModal.close}
    >
      <ReviewForm onCancel={reviewFormModal.close} />
    </Dialog>
  );
};
