import { Box, Typography } from "@material-ui/core";
import * as R from "ramda";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import api from "../../api";
import ChipSelection from "../../common/components/ChipSelection";
import router from "../../common/redux/router";
import MoviePosterScroll from "../components/PosterScroll";

const removeMovieById = (movieId, movies) =>
  R.reject(R.where({ id: R.eqBy(String, movieId) }), movies);

export default ({ keywords }) => {
  const { movieId } = useSelector(router.selectors.query);

  const [selectedKeyword, setSelectedKeyword] = useState(keywords?.[0]);

  const { data } = useQuery(
    ["movie", selectedKeyword?.id],
    () =>
      selectedKeyword &&
      api
        .get("/api/tmdb/discover/movie", {
          params: { withKeywords: [selectedKeyword.id] },
        })
        .then((response) => response.data),

    {}
  );

  const moviesFromKeyword = removeMovieById(movieId, data?.results || []);

  if (keywords.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Box paddingLeft={2}>
        <Typography style={{ fontWeight: "bold" }}>Keywords</Typography>
      </Box>
      <ChipSelection
        chips={keywords}
        selected={selectedKeyword}
        getKey={R.prop("id")}
        getLabel={R.prop("name")}
        onSelect={setSelectedKeyword}
        BoxProps={{
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      />
      <MoviePosterScroll movies={moviesFromKeyword} />
    </React.Fragment>
  );
};
