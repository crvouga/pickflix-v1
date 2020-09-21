import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React from "react";
import { useDispatch } from "react-redux";
import modal from "../redux/modal";

const useStyles = makeStyles((theme) => ({
  fab: {
    zIndex: theme.zIndex.drawer - 1,
    position: "fixed",
    bottom: theme.spacing(2) + 56,
    right: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modal.actions.open("chat"));
  };
  return (
    <Fab color="primary" className={classes.fab} onClick={handleClick}>
      <QuestionAnswerIcon />
    </Fab>
  );
};
