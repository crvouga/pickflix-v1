import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import MobileMoviePage from "./page";
import { useParams } from "react-router";

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
          "release_dates",
        ],
      },
    })
    .then((response) => response.data);

export default () => {
  const { movieId } = useParams();
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
