import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import TabPanel from "../../common/components/TabPanel";
import { useListener } from "../../common/utility";
import { MediaId } from "../../media/tmdb/types";
import useVideoState from "../../media/video/useVideoState";
import { eventEmitterReviewForm } from "../../review/form/edit-create-review/review-form";
import { ReviewCommentsTabValue } from "../redux/movie-page-ui";
import useMoviePageUi from "../redux/useMoviePageUi";
import MovieReviewList from "./ReviewCardList";
import TmdbReviewCardList from "./TmdbReviewCardList";
import YoutubeCommentList from "./YoutubeCommentList";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const videoState = useVideoState();
  const moviePageUi = useMoviePageUi();

  useListener(eventEmitterReviewForm, "submitSuccess", () => {
    moviePageUi.setReviewCommentsTabValue("pickflix");
  });

  const handleChange = (_1: React.ChangeEvent<{}>, newIndex: number) => {
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
        const videoId = videoState.currentVideo?.key;
        return <YoutubeCommentList videoId={videoId} />;
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
