import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React from "react";

const useStyles = makeStyles((theme) => ({
  chatFab: {
    zIndex: theme.zIndex.drawer - 1,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Fab color="primary" className={classes.chatFab}>
      <QuestionAnswerIcon />
    </Fab>
  );
};
