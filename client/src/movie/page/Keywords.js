import { Box, Collapse, Typography } from "@material-ui/core";
import axios from "axios";
import * as R from "ramda";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ChipSelection from "../../common/components/ChipSelection";
import MoviePosterScroll from "../components/PosterScroll";

export default ({ keywords }) => {
  const { movieId } = useParams();
  const removeCurrentMovie = R.reject(R.where({ id: R.eqBy(String, movieId) }));

  const [selectedKeyword, setSelectedKeyword] = useState(keywords?.[0]);

  const query = useQuery(
    ["movie", selectedKeyword?.id],
    () =>
      selectedKeyword &&
      axios
        .get("/api/tmdb/discover/movie", {
          params: { withKeywords: [selectedKeyword.id] },
        })
        .then((response) => response.data),

    {}
  );

  const moviesFromKeyword = R.pipe(
    R.pathOr([], ["data", "results"]),
    removeCurrentMovie
  )(query);

  const keywordCount = keywords.length > 0;

  if (keywordCount === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <ChipSelection
        chips={keywords}
        selected={selectedKeyword}
        getKey={(_) => _.id}
        getLabel={(_) => _.name}
        onSelect={setSelectedKeyword}
        ContainerProps={{
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      />
      <Collapse in={query.status === "success"}>
        <MoviePosterScroll movies={moviesFromKeyword} />
      </Collapse>
    </React.Fragment>
  );
};
