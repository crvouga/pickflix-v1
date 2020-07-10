import { Box, Divider, AppBar, Typography, Toolbar } from "@material-ui/core";
import React from "react";
import Footer from "../../common/Footer";
import useBoolean from "../../common/useBoolean";
import NavigationBar from "../../navigation/mobile/NavigationBar";
import MoviePosterScroll from "../MoviePosterScroll";
import Collection from "./Collection";
import Credits from "./Credits";
import Details from "./Details";
import Header from "./Header";
import Keywords from "./Keywords";
import Media from "./Media";
import Reviews from "./Reviews";
import Title from "./Title";
import Videos from "./Videos";
import HideOnScroll from "../../common/HideOnScroll";

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

  const isOverMedia = useBoolean(true);

  return (
    <Box>
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
    </Box>
  );
};
