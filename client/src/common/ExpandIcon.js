import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  expand: {
    width: "100%",
    height: "100%",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default ({ expanded, ...props }) => {
  const classes = useStyles();
  const className = clsx(classes.expand, {
    [classes.expandOpen]: expanded,
  });
  return (
    <Box display="inline-block" width="2em" height="2em" {...props}>
      <ArrowDropDownIcon className={className} />
    </Box>
  );
};
