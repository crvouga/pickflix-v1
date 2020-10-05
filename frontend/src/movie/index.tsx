import { Box, Button, List } from "@material-ui/core";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import ErrorPage from "../common/page/ErrorPage";
import { actions } from "../redux";
import {
  MovieCredits,
  MovieDetails,
  MovieImages,
  MovieKeywords,
  MovieRecommendations,
  MovieReleaseDates,
  MovieReviews,
  MovieSimilar,
  MovieVideos,
} from "../tmdb/types";
import ActionBar from "./action-bar/ActionBar";
import CollectionSection from "./collection/CollectionSection";
import MoviePosterCardScroll from "./components/MoviePosterCardScroll";
import CreditsSection from "./credits/CreditsSection";
import DetailsSection from "./details/DetailsSection";
import Header from "./Header";
import SkeletonPage from "./page/SkeletonPage";
import DiscoverSection from "./discover/DiscoverSection";
import Review from "./review/Review";
import Reviews from "./review/Reviews";

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

  const query = useQuery<
    {
      credits: MovieCredits;
      reviews: MovieReviews;
      keywords: MovieKeywords;
      images: MovieImages;
      similar: MovieSimilar;
      recommendations: MovieRecommendations;
      videos: MovieVideos;
      releaseDates: MovieReleaseDates;
    } & MovieDetails,
    string
  >(`/movie/${movieId}`, () => fetchMoviePage(movieId), {});

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.status === "success") {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "movie", ...query.data })
      );
    }
  }, [dispatch, query.data, query.status]);

  if (query.status === "loading") {
    return <SkeletonPage />;
  }

  if (query.status === "error") {
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
  } = query.data;

  const handleClickWatchTailer = () => {
    dispatch(actions.video.setPlaylist(videos.results));
    dispatch(actions.router.push({ pathname: "/video" }));
  };

  return (
    <React.Fragment>
      <Header details={details} releaseDates={releaseDates} />

      <Box width="100%" bgcolor="background.default">
        <ActionBar />

        <Box paddingX={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PlayArrowOutlinedIcon />}
            size="large"
            onClick={handleClickWatchTailer}
            disabled={videos.results.length === 0}
          >
            {videos.results.length === 0 ? "No Trailers" : "Watch Trailer"}
          </Button>
        </Box>

        <List>
          <DetailsSection
            details={details}
            releaseDates={releaseDates}
            keywords={keywords}
          />
          <CreditsSection credits={credits} />
        </List>

        {details.belongsToCollection && (
          <CollectionSection collection={details.belongsToCollection} />
        )}

        <MoviePosterCardScroll
          title="People also like"
          movies={[...similar.results, ...recommendations.results]}
        />

        <DiscoverSection details={details} keywords={keywords} />
        <Reviews reviews={reviews} />
      </Box>
    </React.Fragment>
  );
};
