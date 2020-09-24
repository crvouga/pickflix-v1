import { ButtonBase, Container, Dialog, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../redux/modal";
import VideoPage from "./VideoPage";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "100%",
    backgroundColor: theme.palette.background.default,
  },

  fab: {
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    pointerEvents: "all",
  },

  fabContainer: {
    position: "fixed",
    left: 0,
    top: "auto",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    pointerEvents: "none",
  },
}));

export default () => {
  const classes = useStyles();
  const isOpen = useSelector(modal.selectors.isOpen("video"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modal.actions.close("video"));
  };

  return (
    <Dialog
      PaperProps={{ classes: { root: classes.paper } }}
      onClose={handleClose}
      open={isOpen}
      keepMounted
      fullScreen
      // TransitionComponent={TransitionComponent}
    >
      <Container disableGutters maxWidth="xs">
        <VideoPage />

        <div className={classes.fabContainer}>
          <ButtonBase onClick={handleClose} className={classes.fab}>
            <CloseIcon />
          </ButtonBase>
        </div>
      </Container>
    </Dialog>
  );
};
