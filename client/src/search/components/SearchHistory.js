import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import clsx from "clsx";
import React from "react";
import useBoolean from "../../common/hooks/useBoolean";
import SearchResults from "./SearchResults";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  header: {
    display: "flex",
    justifyItems: "start",
  },
  title: {
    padding: theme.spacing(2),
    flex: 1,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  enabled: {
    color: theme.palette.text.secondary,
  },
  icon: {
    marginBottom: "-0.25em",
  },
  iconButton: {},
}));

export default ({ history, onClearHistory, onResultClick }) => {
  const classes = useStyles();
  const open = useBoolean();
  const handleClear = () => {
    onClearHistory();
    open.setFalse();
  };
  return (
    <div className={classes.root}>
      <Dialog open={open.value} onClose={open.setFalse}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear search history?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={open.setFalse}>Cancel</Button>
          <Button
            variant="contained"
            className={classes.clear}
            onClick={handleClear}
          >
            <DeleteForeverIcon /> Clear
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.header}>
        <Typography color="textSecondary" className={classes.title}>
          <HistoryIcon className={classes.icon} /> Recently Searched
        </Typography>
        <IconButton
          onClick={open.setTrue}
          disabled={history.length === 0}
          className={clsx(classes.iconButton, {
            [classes.disabled]: history.length === 0,
            [classes.enabled]: history.length > 0,
          })}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>

      {history.length === 0 && (
        <Typography align="center" color="textSecondary">
          No Recently Searched
        </Typography>
      )}

      <SearchResults results={history} onResultClick={onResultClick} />
    </div>
  );
};
