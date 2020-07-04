import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    zIndex: -1,
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default ({ expanded, className, ...props }) => {
  const classes = useStyles();

  return (
    <ArrowDropDownIcon
      className={clsx(className, classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      {...props}
    />
  );
};
