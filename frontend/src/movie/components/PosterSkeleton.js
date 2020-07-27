import { makeStyles, Paper, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    borderRadius: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Box
      component={Paper}
      variant="outlined"
      className={classes.root}
      {...props}
    >
      <AspectRatio ratio="18/24">
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </AspectRatio>
    </Box>
  );
};
