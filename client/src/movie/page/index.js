import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import Footer from "../../common/page/Footer";
import MoviePosterScroll from "../components/PosterScroll";
import Collection from "./Collection";
import Credits from "./Credits";
import Details from "./Details";
import Header from "./Header";
import Keywords from "./Keywords";
import Media from "./Media";
import Reviews from "./Reviews";
import Title from "./Title";
import Videos from "./Videos";
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
    releaseDates,
    ...details
  } = data;

  return (
    <Page>
      <Media videos={videos.results} images={images} />

      <Header details={details} releaseDates={releaseDates} />

      <Divider />

      <Credits credits={credits} />
      <Divider />

      <Videos videos={videos.results} />
      <Divider />

      <Collection details={details} />
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
