import {
  CircularProgress,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
} from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Scroll from "../../common/Scroll";
import useMakeImageUrl from "../../tmdb/useMakeImageUrl";
import MoviePoster from "../MoviePoster";
const useStyles = makeStyles((theme) => ({}));

Promise.objectAll = async (object) => {
  const values = await Promise.all(R.values(object));
  return R.zipObj(R.keys(object), values);
};

const fetchMoviesByKeywords = async (id) => {
  return {};
};

const renderPoster = (movie) => (
  <MoviePoster quality={2} size="small" {...movie} />
);

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();

  const recommendationsQuery = useQuery(
    ["movie", id, "recommendation"],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const similarQuery = useQuery(
    ["movies", id, "similar"],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const moviesByKeywordQuery = useQuery(
    ["movie", id, "moviesByKeyword"],
    () => fetchMoviesByKeywords(id),
    {}
  );

  const isLoaded = [
    recommendationsQuery,
    similarQuery,
    moviesByKeywordQuery,
  ].every((query) => query.status === "success");

  if (!isLoaded) {
    return <CircularProgress color="secondary" />;
  }

  const [similar, recommendations, moviesByKeyword] = [
    similarQuery,
    recommendationsQuery,
    moviesByKeywordQuery,
  ].map((query) => query.data.results);

  return (
    <React.Fragment>
      <GridList cols={3}>
        {recommendations.length > 0 && (
          <GridListTile
            cols={3}
            key="recommendations header"
            style={{ height: "auto" }}
          >
            <Typography
              style={{ fontWeight: "bold" }}
              color="textSecondary"
              variant="h6"
            >
              Recommendations
            </Typography>
          </GridListTile>
        )}
        {recommendations.map((movie) => (
          <GridListTile
            key={movie.id}
            onClick={() => history.push(`/movie/${movie.id}`)}
          >
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src={makeImageUrl(3, movie)}
            />
          </GridListTile>
        ))}
        {similar.length > 0 && (
          <GridListTile
            cols={3}
            key="similar header"
            style={{ height: "auto" }}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "bold" }}
              color="textSecondary"
            >
              Similar
            </Typography>
          </GridListTile>
        )}
        {similar.map((movie) => (
          <GridListTile
            key={movie.id}
            onClick={() => history.push(`/movie/${movie.id}`)}
          >
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src={makeImageUrl(3, movie)}
            />
          </GridListTile>
        ))}
      </GridList>
      <Scroll
        title="Movies also tagged..."
        itemByKey={moviesByKeyword}
        renderItem={renderPoster}
      />
    </React.Fragment>
  );
};
