import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { BackendAPI } from "../../backend-api";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";

import { history } from "../../navigation/history/history";
import {
  PersonDetailsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
} from "../../tmdb/types";
import { makeFadeToBackgroundCss } from "../../utils";
import Details from "./Details";
import MovieCreditsSection from "./MovieCreditsSection";
import PosterHeader from "./PosterHeader";
import NavBar from "../../navigation/NavBar";

const fetchPersonPage = (tmdbMediaId: string) =>
  BackendAPI.get<
    {
      credits: PersonMovieCreditsResponse;
      images: PersonImagesResponse;
    } & PersonDetailsResponse
  >(`/api/tmdb/person/${tmdbMediaId}`, {
    params: {
      appendToResponse: ["credits", "movie_credits", "images", "tagged_images"],
    },
  }).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  fadeToBackground: {
    background: makeFadeToBackgroundCss(theme, [0, 0, 0.5, 0.9, 1]),
  },
}));

export default () => {
  const classes = useStyles();
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();

  const query = useQuery(`/person/${tmdbMediaId}`, () =>
    fetchPersonPage(tmdbMediaId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.data) {
      dispatch(history.actions.push({ mediaType: "person", ...query.data }));
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
      <NavBar />

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
