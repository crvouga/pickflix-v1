import { Dialog, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import useModal from "../../navigation/modals/useModal";
import ReviewForm from "./ReviewForm";

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
  const reviewFormModal = useModal("ReviewForm");

  const handleCancel = () => {
    reviewFormModal.close();
  };

  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullScreen={isMobile}
      classes={classesDialog}
      open={reviewFormModal.isOpen}
      onClose={handleCancel}
      transitionDuration={0}
    >
      <ReviewForm />
    </Dialog>
  );
};
