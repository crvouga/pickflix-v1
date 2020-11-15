import {
  Dialog,
  makeStyles,
  useMediaQuery,
  useTheme,
  Slide,
} from "@material-ui/core";
import React, { useEffect } from "react";
import useModal from "../../navigation/modals/useModal";
import ReviewForm from "./ReviewForm";
import useReviewForm from "./useReviewForm";
import { TransitionProps } from "@material-ui/core/transitions";

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

const SlideUp = (props: TransitionProps) => {
  return <Slide direction="up" {...props} />;
};

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
      TransitionComponent={SlideUp}
      fullScreen={isMobile}
      classes={classesDialog}
      open={reviewFormModal.isOpen}
      onClose={handleClose}
      keepMounted
    >
      <ReviewForm onCancel={handleClose} />
    </Dialog>
  );
};
