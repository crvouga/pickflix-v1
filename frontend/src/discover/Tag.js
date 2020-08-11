import { Chip, makeStyles } from "@material-ui/core";
import React from "react";

const useStylesChip = makeStyles((theme) => ({
  outlined: {
    color: theme.palette.text.secondary,
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  root: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff",
  },
}));

export default ({ tag, variant, ...restOfProps }) => {
  const classesChip = useStylesChip();

  const classes =
    variant === "outlined"
      ? { outlined: classesChip.outlined }
      : { root: classesChip.root };

  return (
    <Chip
      clickable
      classes={classes}
      variant={variant}
      label={tag.name}
      {...restOfProps}
    />
  );
};
