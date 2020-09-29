import { Fade } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../../backendAPI";
import ErrorPage from "../../common/page/ErrorPage";
import Footer from "../../common/page/Footer";
import Page from "../../common/page/Page";
import { actions } from "../../redux";
import Collection from "./Collection";
import Credits from "./Credits";
import Details from "./Details";
import Header from "./Header";
import Media from "./Media";
import RelatedMovies from "./RelatedMovies";
import Reviews from "./Reviews";
import SkeletonPage from "./SkeletonPage";
import Videos from "./Videos";
import {
  MovieKeywords,
  MovieCredits,
  MovieReviews,
  MovieImages,
  MovieSimilar,
  MovieRecommendations,
  MovieVideos,
  MovieReleaseDates,
  MovieDetails,
} from "../../tmdb/types";

const fetchMoviePage = (movieId: string) =>
  backendAPI
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
  const { movieId } = useParams<{ movieId: string }>();

  const { status, data } = useQuery(
    `/movie/${movieId}`,
    () => fetchMoviePage(movieId),
    {}
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      dispatch(actions.recentlyViewed.viewed({ mediaType: "movie", ...data }));
    }
  }, [dispatch, data, status]);

  if (status === "loading") {
    return <SkeletonPage />;
  }
  if (status === "error") {
    return <ErrorPage />;
  }

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
  }: {
    credits: MovieCredits;
    reviews: MovieReviews;
    keywords: MovieKeywords;
    images: MovieImages;
    similar: MovieSimilar;
    recommendations: MovieRecommendations;
    videos: MovieVideos;
    releaseDates: MovieReleaseDates;
  } & MovieDetails = data;

  return (
    <Fade in>
      <Page>
        {/* <NavBar details={details} /> */}
        <Media videos={videos} images={images} />
        <Header details={details} releaseDates={releaseDates} />
        <Credits credits={credits} />
        <Videos videos={videos.results} />
        <Collection details={details} />
        <RelatedMovies recommendations={recommendations} similar={similar} />
        <Reviews reviews={reviews} />
        <Details details={details} keywords={keywords} />
        <Footer />
      </Page>
    </Fade>
  );
};
