import {
  ButtonBase,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import clsx from "clsx";
import * as R from "ramda";
import React, { useEffect } from "react";
import { queryCache } from "react-query";
import { useLocation, useParams } from "react-router";
import MoviePoster from "../movie/MoviePoster";
import PersonProfile from "../person/PersonProfile";
import useLocalStorage from "./useLocalStorage";
import useBoolean from "./useBoolean";

const useEntityHistory = () => {
  const [entities, setEntities] = useLocalStorage("history", []);

  const clear = () => {
    setEntities([]);
  };

  const push = (entityData) => {
    setEntities(R.pipe(R.prepend(entityData), R.uniqBy(R.prop("id"))));
  };

  const { pathname } = useLocation();
  const { movieId, personId } = useParams();

  useEffect(() => {
    const queryData = queryCache.getQueryData(pathname);

    if (pathname === `/movie/${movieId}`) {
      const keys = ["posterPath", "id", "title"];
      const queryDataSubset = R.pipe(
        R.pick(keys),
        R.assoc("mediaType", "movie")
      )(queryData);
      push(queryDataSubset);
    }

    if (pathname === `/person/${personId}`) {
      const keys = ["profilePath", "id", "name"];
      const queryDataSubset = R.pipe(
        R.pick(keys),
        R.assoc("mediaType", "person")
      )(queryData);
      push(queryDataSubset);
    }
  }, [pathname]);

  return {
    entities,
    clear,
  };
};
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
  },

  icon: {
    marginBottom: "-0.25em",
  },

  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
  },

  entity: {
    minWidth: "120px",
    width: "120px",

    margin: theme.spacing(1),
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
  const { entities, clear } = useEntityHistory();
  const open = useBoolean();
  const handleClear = () => {
    clear();
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
          disabled={entities.length === 0}
          className={clsx({
            [classes.disabled]: entities.length === 0,
            [classes.enabled]: entities.length > 0,
          })}
        >
          <Typography color="inherit">
            <DeleteForeverIcon className={classes.icon} /> Clear
          </Typography>
        </ButtonBase>
      </div>
      {entities.length === 0 && (
        <Typography gutterBottom color="textSecondary" align="center">
          No Recently Viewed
        </Typography>
      )}
      <div className={classes.scroll}>
        {entities.map((entity) => (
          <div key={entity.id} className={classes.entity}>
            {entity.mediaType === "person" ? (
              <PersonProfile person={entity} />
            ) : entity.mediaType === "movie" ? (
              <MoviePoster movie={entity} />
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
