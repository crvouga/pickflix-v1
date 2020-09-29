import { ButtonBase, Container, Dialog, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import VideoPage from "./VideoPage";
import { ModalName } from "../redux/router/types";

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
  const isOpen = useSelector(selectors.router.isOpen(ModalName.VideoPlayer));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(actions.router.close({ name: ModalName.VideoPlayer }));
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
