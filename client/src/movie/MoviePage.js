import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import ErrorPage from "../common/ErrorPage";
import LoadingPage from "../common/LoadingPage";
import MobileMoviePage from "./mobile/MoviePage";

const fetchMoviePage = (movieId) =>
  axios
    .get(`/api/tmdb/movie/${movieId}`, {
      params: {
        appendToResponse: [
          "credits",
          "reviews",
          "similar",
          "recommendations",
          "keywords",
          "videos",
          "images",
        ],
      },
    })
    .then((response) => response.data);

export default ({ movieId }) => {
  const query = useQuery(
    `/movie/${movieId}`,
    () => fetchMoviePage(movieId),
    {}
  );

  if (query.status === "loading") {
    return <LoadingPage />;
  }

  if (query.status === "error") {
    return <ErrorPage />;
  }

  return <MobileMoviePage data={query.data} />;
};
