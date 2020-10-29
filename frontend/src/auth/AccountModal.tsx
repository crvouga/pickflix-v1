import { Dialog, useMediaQuery, useTheme, makeStyles } from "@material-ui/core";
import React from "react";
import useModal from "../navigation/modals/useModal";
import SearchPage from "./AccountPage";
import AccountPage from "./AccountPage";

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
  const modal = useModal("Account");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      classes={classesDialog}
      fullScreen={isMobile}
      open={modal.isOpen}
      onClose={modal.close}
    >
      <AccountPage />
    </Dialog>
  );
};
