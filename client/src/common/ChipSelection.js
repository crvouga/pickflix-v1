import React from "react";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowX: "auto",
    flexWrap: "nowrap",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
}));

export default ({ selectedKey, keys, onChipClick, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {keys.map((key) => (
        <Chip
          className={classes.chip}
          key={key}
          label={key}
          clickable
          onClick={() => onChipClick(key)}
          variant={key === selectedKey ? "default" : "outlined"}
        />
      ))}
    </div>
  );
};
