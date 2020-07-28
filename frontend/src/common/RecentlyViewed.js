import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "./components/HorizontalScroll";
import useBoolean from "./hooks/useBoolean";
import Poster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";
import recentlyViewed from "./redux/recentlyViewed";

const useStyles = makeStyles((theme) => ({
  root: {},

  header: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: "flex",
    justifyItems: "start",
  },
  title: {
    padding: theme.spacing(1),
    flex: 1,
    fontWeight: "bold",
  },

  icon: {
    marginBottom: "-0.25em",
  },

  disabled: {
    color: theme.palette.action.disabled,
  },
  enabled: {
    color: theme.palette.text.secondary,
  },
}));

export default () => {
  const classes = useStyles();
  const recentlyViewedEntities = useSelector(recentlyViewed.selectors.entities);
  const dispatch = useDispatch();
  const open = useBoolean();

  const handleClear = () => {
    dispatch(recentlyViewed.actions.clear);
    open.setFalse();
  };

  return (
    <div className={classes.root}>
      <Dialog open={open.value} onClose={open.setFalse}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear recently viewed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={open.setFalse}>Cancel</Button>
          <Button variant="contained" onClick={handleClear}>
            <DeleteForeverIcon /> Clear
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.header}>
        <Typography color="textSecondary" className={classes.title}>
          <HistoryIcon className={classes.icon} /> Recently Viewed
        </Typography>
        <ButtonBase
          onClick={open.setTrue}
          disabled={recentlyViewedEntities.length === 0}
          className={clsx({
            [classes.disabled]: recentlyViewedEntities.length === 0,
            [classes.enabled]: recentlyViewedEntities.length > 0,
          })}
        >
          <Typography color="inherit">
            <DeleteForeverIcon className={classes.icon} /> Clear
          </Typography>
        </ButtonBase>
      </div>
      {recentlyViewedEntities.length === 0 && (
        <Typography gutterBottom color="textSecondary" align="center">
          No Recently Viewed
        </Typography>
      )}
      <HorizontalScroll paddingLeft={2}>
        {recentlyViewedEntities.map((entity) => (
          <Box key={entity.id} width="150px" marginRight={1}>
            {entity.mediaType === "person" ? (
              <React.Fragment>
                <PersonAvatar person={entity} />
                <Typography align="center">{entity.name}</Typography>
              </React.Fragment>
            ) : entity.mediaType === "movie" ? (
              <Poster movie={entity} width="100%" />
            ) : (
              <div />
            )}
          </Box>
        ))}
      </HorizontalScroll>
    </div>
  );
};
