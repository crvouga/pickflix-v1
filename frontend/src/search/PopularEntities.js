import { Box, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import backendAPI from "../backendAPI";
import ResultGrid from "./ResultGrid";
import ResultGridSkeleton from "./ResultGridSkeleton";

const fetchPopularEntities = async () => {
  const responses = await Promise.all([
    backendAPI.get("/api/tmdb/movie/popular"),
    backendAPI.get("/api/tmdb/person/popular"),
  ]);
  const [movieResults, personResults] = R.map(
    R.pathOr([], ["data", "results"]),
    responses
  );
  const movies = R.map(R.assoc("mediaType", "movie"), movieResults);
  const persons = R.map(R.assoc("mediaType", "person"), personResults);
  const entities = R.unnest(R.zip(movies, persons));

  return entities;
};

export default () => {
  const query = useQuery(["popularEntities"], fetchPopularEntities);
  if (query.status === "loading") return <ResultGridSkeleton />;
  if (query.status === "error") return null;
  const entities = query.data;
  return (
    <div>
      <Box display="flex" paddingX={2} paddingY={1} color="text.secondary">
        <Typography>Popular Movies & People</Typography>
      </Box>
      <ResultGrid results={entities} />
    </div>
  );
};
