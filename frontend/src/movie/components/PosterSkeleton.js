import { makeStyles, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <AspectRatio ratio="18/24">
        <Skeleton variant="rect" width="100%" height="100%" />
      </AspectRatio>
    </Paper>
  );
};
