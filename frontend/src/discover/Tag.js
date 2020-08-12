import { Box, Chip, makeStyles, Avatar, Typography } from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

const useStylesChip = makeStyles((theme) => ({
  outlined: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  root: {
    padding: theme.spacing(2),
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff",
  },
  avatar: {
    width: "100px",
    height: "100px",
  },
}));

export default ({ tag, variant, ...restOfProps }) => {
  const classesChip = useStylesChip();

  const classes =
    variant === "outlined"
      ? { avatar: classesChip.avatar, outlined: classesChip.outlined }
      : { avatar: classesChip.avatar, root: classesChip.root };

  return (
    <Chip
      clickable
      //avatar={<Avatar src={makeTMDbImageURL(3, tag)} />}
      classes={classes}
      variant={variant}
      label={tag.name}
      {...restOfProps}
    />
  );
};
