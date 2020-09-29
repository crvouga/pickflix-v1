import { Dialog, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux";
import { ModalName } from "../../redux/router/types";
import Steps from "./Steps";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default () => {
  const classesDialog = useStyles();
  const isOpen = useSelector(selectors.router.isOpen(ModalName.SignIn));
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.router.close({ name: ModalName.SignIn }));
  };
  return (
    <Dialog classes={classesDialog} fullScreen open={isOpen} onClose={onClose}>
      <Paper>
        {/* <Toolbar>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar> */}
        <Steps />
      </Paper>
    </Dialog>
  );
};
