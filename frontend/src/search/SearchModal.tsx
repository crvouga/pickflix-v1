import { Dialog, useMediaQuery, useTheme, makeStyles } from "@material-ui/core";
import React from "react";
import useModal from "../navigation/modals/useModal";
import SearchPage from "./SearchPage";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      width: "480px",
      height: "100vh",
    },
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const searchModal = useModal("Search");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      classes={classesDialog}
      fullScreen={isMobile}
      open={searchModal.isOpen}
      onClose={searchModal.close}
    >
      <SearchPage />
    </Dialog>
  );
};
