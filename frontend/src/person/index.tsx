import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import ErrorPage from "../common/page/ErrorPage";
import { actions } from "../redux";
import {
  PersonDetailsResponse,
  PersonMovieCreditsResponse,
  PersonImagesResponse,
} from "../tmdb/types";
import Details from "./Details";
import MovieCreditsSection from "./MovieCreditsSection";
import PosterHeader from "./PosterHeader";
import SkeletonPage from "./SkeletonPage";
import { Box, makeStyles } from "@material-ui/core";
import classes from "*.module.css";
import { makeFadeToBackgroundCss } from "../utils";
import NavigationBar from "../common/NavigationBar";
import LoadingPage from "../common/page/LoadingPage";

const fetchPersonPage = (personId: string) =>
  backendAPI
    .get(`/api/tmdb/person/${personId}`, {
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

  const query = useQuery<
    {
      credits: PersonMovieCreditsResponse;
      images: PersonImagesResponse;
    } & PersonDetailsResponse,
    string
  >(`/person/${personId}`, () => fetchPersonPage(personId));

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.status === "success") {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "person", ...query.data })
      );
    }
  }, [query]);

  if (query.status === "loading") {
    return (
      <React.Fragment>
        <NavigationBar />
        <LoadingPage />
      </React.Fragment>
    );
  }

  if (query.status === "error") {
    return <ErrorPage />;
  }

  const { credits, images, ...details } = query.data;

  return (
    <React.Fragment>
      <NavigationBar title={details.name} />

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
