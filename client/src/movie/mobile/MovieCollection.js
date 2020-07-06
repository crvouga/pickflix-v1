import { makeStyles, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieBackdrop from "../MovieBackdrop";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
  },
  spinnerContainer: {
    textAlign: "center",
    marginTop: theme.spacing(8),
  },
  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  part: {
    minWidth: "240px",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  name: {
    fontWeight: "bold",
  },
}));

export default ({ details }) => {
  const history = useHistory();
  const { id, belongsToCollection } = details;
  if (R.isNil(belongsToCollection)) {
    return null;
  }

  const classes = useStyles();
  const { id: collectionId } = belongsToCollection;
  const query = useQuery(["collection", collectionId], () =>
    axios.get(`/api/tmdb/collection/${collectionId}`).then((res) => res.data)
  );
  if (query.status === "error") {
    return null;
  }
  if (query.status === "loading") {
    return null;
  }
  const { name, overview, parts } = query.data;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.name}>{name}</Typography>
        <Typography gutterBottom color="textSecondary" variant="body1">
          {overview}
        </Typography>
      </div>

      <div className={classes.scroll}>
        {parts.map((part) => (
          <div
            key={part.id}
            className={classes.part}
            onClick={() => history.push(`/movie/${part.id}`)}
          >
            <MovieBackdrop movie={part} />
            <Typography color="textSecondary">{part.title}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
