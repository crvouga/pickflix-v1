import React from "react";
import Footer from "../../common/page/Footer";
import Page from "../../common/page/Page";
import Collection from "./Collection";
import Credits from "./Credits";
import Details from "./Details";
import Header from "./Header";
import Media from "./Media";
import RelatedMovies from "./RelatedMovies";
import Reviews from "./Reviews";
import Videos from "./Videos";
import { useParams } from "react-router";
import LoadingPage from "../../common/page/LoadingPage";
import ErrorPage from "../../common/page/ErrorPage";
import api from "../../api";
import { useQuery } from "react-query";

const fetchMoviePage = (movieId) =>
  api
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

  const { status, data } = useQuery(
    `/movie/${movieId}`,
    () => fetchMoviePage(movieId),
    {}
  );

  if (status === "loading") return <LoadingPage />;
  if (status === "error") return <ErrorPage />;

  const {
    credits,
    reviews,
    keywords,
    images,
    similar,
    videos,
    recommendations,
    releaseDates,
    ...details
  } = data;

  return (
    <Page>
      <Media videos={videos.results} images={images} />
      <Header details={details} releaseDates={releaseDates} />
      <Credits credits={credits} />
      <Videos videos={videos.results} />
      <Collection details={details} />
      <RelatedMovies
        recommendations={recommendations.results}
        similar={similar.results}
        keywords={keywords.keywords}
      />
      <Details details={details} />
      <Reviews reviews={reviews} />
      <Footer />
    </Page>
  );
};
