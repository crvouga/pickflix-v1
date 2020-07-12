import { Box, Divider } from "@material-ui/core";
import React from "react";
import Footer from "../../common/page/Footer";
import MoviePosterScroll from "../components/PosterScroll";
import Collection from "./components/Collection";
import Credits from "./components/Credits";
import Details from "./components/Details";
import Header from "./components/Header";
import Keywords from "./components/Keywords";
import Media from "./components/Media";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import Videos from "./components/Videos";
import Page from "../../common/page/Page";

export default ({ data }) => {
  const {
    credits,
    reviews,
    keywords,
    images,
    similar,
    videos,
    recommendations,
    ...details
  } = data;

  return (
    <Page>
      {images.backdrops.length > 0 && (
        <Media videos={videos.results} images={images} />
      )}
      <Header details={details} />

      <Divider />

      <Credits credits={credits} />
      <Divider />

      <Collection details={details} />
      <Divider />

      <Videos videos={videos.results} />
      <Divider />

      <Box paddingTop={2}>
        {recommendations.results.length > 0 && (
          <React.Fragment>
            <Title>Recommendations</Title>
            <MoviePosterScroll movies={recommendations.results} />
          </React.Fragment>
        )}

        {similar.results.length > 0 && (
          <React.Fragment>
            <Title>Similar</Title>
            <MoviePosterScroll movies={similar.results} />
          </React.Fragment>
        )}

        {keywords.keywords.length > 0 && (
          <React.Fragment>
            <Title>Keywords</Title>
            <Keywords keywords={keywords.keywords} />
          </React.Fragment>
        )}
      </Box>
      <Divider />

      <Details details={details} />
      <Divider />

      <Reviews reviews={reviews} />
      <Divider />

      <Footer />
    </Page>
  );
};
