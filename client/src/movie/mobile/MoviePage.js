import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import Chips from "../../common/Chips";
import Footer from "../../common/Footer";
import MoviePosterScroll from "../MoviePosterScroll";
import ActionBar from "./ActionBar";
import Details from "./Details";
import Header from "./Header";
import Keywords from "./Keywords";
import MovieCollection from "./MovieCollection";
import MovieCredits from "./MovieCredits";
import MovieReviews from "./MovieReviews";
import Title from "./Title";
import Videos from "./Videos";
momentDurationFormatSetup(moment);

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

export default ({ data }) => {
  const {
    credits,
    reviews,
    keywords,
    images,
    similar,
    videos: { results: videos },
    recommendations,
    ...details
  } = data;

  const subtitle1 = [
    moment(details.releaseDate).format("Y"),
    moment.duration(details.runtime, "minutes").format("h[h] m[m]"),
  ].join(" • ");

  return (
    <React.Fragment>
      {/* <NavigationBar title={details.title} /> */}
      {images.backdrops.length > 0 && (
        <Header videos={videos} images={images} />
      )}

      <Box p={2} paddingBottom={0}>
        <Typography align="left" variant="h5" style={{ flex: 1 }}>
          {details.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle1}
        </Typography>
      </Box>

      <Chips
        p={1}
        paddingLeft={2}
        chips={details.genres}
        getLabel={(_) => _.name}
      />
      <ActionBar />

      <Box paddingX={2} paddingBottom={2}>
        {details.tagline !== details.overview && (
          <Typography align="center" style={{ fontWeight: "bold" }}>
            {details.tagline}
          </Typography>
        )}
        <Typography variant="body1" color="textSecondary">
          {details.overview}
        </Typography>
      </Box>

      <Divider />

      <MovieCredits credits={credits} />
      <Divider />

      <MovieCollection details={details} />
      <Divider />

      <Videos videos={videos} />
      <Divider />

      <Title>Recommendations</Title>
      <MoviePosterScroll movies={recommendations.results} />
      <Title>Similar</Title>
      <MoviePosterScroll movies={similar.results} />
      <Title>Keywords</Title>
      <Keywords keywords={keywords.keywords} />

      <Divider />
      <Box p={2}>
        <Details details={details} />
      </Box>
      <Divider />

      <MovieReviews reviews={reviews} />
      <Divider />

      <Footer />
    </React.Fragment>
  );
};
