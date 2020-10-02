import {
  ButtonBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";

const useStyles = makeStyles((theme) => ({
  doneButton: {
    position: "fixed",
    top: "auto",
    bottom: "0",
    left: "0",
    width: "100%",
    zIndex: 2,
    textAlign: "left",
    padding: theme.spacing(2),
    borderTop: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ({ onClick }: { onClick: () => void }) => {
  const classes = useStyles();
  return (
    <ButtonBase onClick={onClick} className={classes.doneButton}>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText primary="Done" />
      </ListItem>
    </ButtonBase>
  );
};
