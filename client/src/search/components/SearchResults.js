import { makeStyles, Grow } from "@material-ui/core";
import React from "react";
import MoviePoster from "../../movie/components/Poster";
import PersonProfile from "../../person/PersonProfile";
import PersonAvatar from "../../person/PersonAvatar";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    padding: theme.spacing(1 / 2),
    width: "33.33%",
    margin: 0,
    marginBottom: "auto",
  },
}));

export default ({ results, onResultClick }) => {
  const classes = useStyles();

  const handleResultClick = (result) => () => {
    onResultClick(result);
  };

  return (
    <div className={classes.grid}>
      {results.map((result, i) => (
        <div
          key={result.id}
          className={classes.cell}
          onClick={handleResultClick(result)}
        >
          <Grow in>
            {result.mediaType === "movie" ? (
              <MoviePoster movie={result} />
            ) : result.mediaType === "person" ? (
              <PersonAvatar person={result} />
            ) : (
              <div />
            )}
          </Grow>
        </div>
      ))}
    </div>
  );
};
