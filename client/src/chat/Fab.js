import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React from "react";
import { useDispatch } from "react-redux";
import modal from "../common/redux/modal";

const useStyles = makeStyles((theme) => ({
  chatFab: {
    zIndex: theme.zIndex.drawer - 1,
    position: "fixed",
    bottom: theme.spacing(2) + 48,
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
    <Fab color="primary" className={classes.chatFab} onClick={handleClick}>
      <QuestionAnswerIcon />
    </Fab>
  );
};
