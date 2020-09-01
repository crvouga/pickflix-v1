import {
  AppBar,
  Paper,
  Box,
  Dialog,
  IconButton,
  Toolbar,
  makeStyles,
  Slide,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux";
import Steps from "./Steps";

const TransitionComponent = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default () => {
  const classesDialog = useStyles();
  const isOpen = useSelector(selectors.modal.isOpen("SignInDialog"));
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.modal.close("SignInDialog"));
  };
  return (
    <Dialog
      TransitionComponent={TransitionComponent}
      classes={classesDialog}
      fullScreen
      open={isOpen}
      onClose={onClose}
    >
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
