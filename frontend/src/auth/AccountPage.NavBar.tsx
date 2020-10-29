import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <IconButton onClick={history.goBack} edge="start">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.bold}>
          Account
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
