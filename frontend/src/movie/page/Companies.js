import { makeStyles, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import TMDB from "../../api/tmdb";
import MovieBackdrop from "../../components/MovieBackdrop";

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
    width: "240px",

    padding: theme.spacing(1),
  },
  name: {
    fontWeight: "bold",
  },
}));

export default ({ details }) => {
  const { id, productionCompanies } = details;
  if (R.isNil(productionCompanies)) {
    return null;
  }

  const params = {
    withCompanies: R.join("|", R.pluck("id", productionCompanies)),
  };
  const classes = useStyles();

  const query = useQuery(["collection", collectionId], () =>
    TMDB.discover.movie(params)
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
          <div className={classes.part} key={part.id}>
            <MovieBackdrop movie={part} />
          </div>
        ))}
      </div>
    </div>
  );
};
