import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import useReviewForm from "../../reviews/form/review-form/useReviewForm";
import { MediaId } from "../../tmdb/types";
import { useListener } from "../../utils";
import useVideoState from "../../video/useVideoState";
import { ReviewCommentsTabValue } from "../redux/movie-page-ui";
import useMoviePageUi from "../redux/useMoviePageUi";
import MovieReviewList from "./ReviewCardList";
import TmdbReviewCardList from "./TmdbReviewCardList";
import YoutubeCommentList from "./YoutubeCommentList";

const TabPanel = (props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) => {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} minHeight="360px">
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </Box>
  );
};

export default ({ mediaId }: { mediaId: MediaId }) => {
  const videoState = useVideoState();
  const moviePageUi = useMoviePageUi();
  const reviewForm = useReviewForm();

  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    moviePageUi.setReviewCommentsTabValue("pickflix");
  });

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    if (moviePageUi.reviewCommentsTabOrder[newIndex]) {
      moviePageUi.setReviewCommentsTabValue(
        moviePageUi.reviewCommentsTabOrder[newIndex]
      );
    }
  };

  const tabValueToLabel = (tabValue: ReviewCommentsTabValue) => {
    switch (tabValue) {
      case "pickflix":
        return "Pickflix";
      case "tmdb":
        return "TMDb";
      case "youtube":
        return "Youtube";
    }
  };

  const tabValueToTabComponent = (tabValue: ReviewCommentsTabValue) => {
    switch (tabValue) {
      case "pickflix":
        return <MovieReviewList mediaId={mediaId} />;
      case "tmdb":
        return <TmdbReviewCardList mediaId={mediaId} />;
      case "youtube":
        return <YoutubeCommentList videoId={videoState.currentVideo?.key} />;
    }
  };

  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">Reviews & Comments</Typography>
      </Box>
      <Box paddingBottom={2}>
        <Tabs
          value={moviePageUi.reviewCommentsTabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {moviePageUi.reviewCommentsTabOrder.map((tabValue) => (
            <Tab key={tabValue} label={tabValueToLabel(tabValue)} />
          ))}
        </Tabs>
      </Box>
      {moviePageUi.reviewCommentsTabOrder.map((tabValue, index) => (
        <TabPanel
          key={tabValue}
          value={moviePageUi.reviewCommentsTabIndex}
          index={index}
        >
          {tabValueToTabComponent(tabValue)}
        </TabPanel>
      ))}
    </React.Fragment>
  );
};
