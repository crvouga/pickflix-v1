import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  expand: {
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
  return <ArrowDropDownIcon className={className} {...props} />;
};
