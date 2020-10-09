import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import NavigationBarFadeIn from "../navigation/NavigationBarFadeIn";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import { actions } from "../redux";
import {
  PersonDetailsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
} from "../tmdb/types";
import { makeFadeToBackgroundCss } from "../utils";
import Details from "./Details";
import MovieCreditsSection from "./MovieCreditsSection";
import PosterHeader from "./PosterHeader";

const fetchPersonPage = (personId: string) =>
  backendAPI
    .get<
      {
        credits: PersonMovieCreditsResponse;
        images: PersonImagesResponse;
      } & PersonDetailsResponse
    >(`/api/tmdb/person/${personId}`, {
      params: {
        appendToResponse: [
          "credits",
          "movie_credits",
          "images",
          "tagged_images",
        ],
      },
    })
    .then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  fadeToBackground: {
    background: makeFadeToBackgroundCss(theme, [0, 0, 0.5, 0.9, 1]),
  },
}));

export default () => {
  const classes = useStyles();
  const { personId } = useParams<{ personId: string }>();

  const query = useQuery(`/person/${personId}`, () =>
    fetchPersonPage(personId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.data) {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "person", ...query.data })
      );
    }
  }, [query, dispatch]);

  if (query.isLoading) {
    return <LoadingPage />;
  }

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return null;
  }

  const { credits, images, ...details } = query.data;

  return (
    <React.Fragment>
      <NavigationBarFadeIn title={details.name} />

      <Box
        position="sticky"
        top={0}
        zIndex={-1}
        className={classes.fadeToBackground}
      >
        <PosterHeader details={details} credits={credits} />
      </Box>

      <Box width="100%" bgcolor="background.default">
        <Details images={images} details={details} credits={credits} />
        <MovieCreditsSection details={details} credits={credits} />
      </Box>
    </React.Fragment>
  );
};
