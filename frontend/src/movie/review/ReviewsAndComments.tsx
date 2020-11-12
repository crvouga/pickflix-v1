import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import { MediaId } from "../../tmdb/types";
import useVideoState from "../../video/useVideoState";
import useMoviePageUiState from "../redux/useMoviePageUiState";
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
  const moviePageUiState = useMoviePageUiState();

  const index = moviePageUiState.reviewCommentsTabIndex;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    moviePageUiState.setReviewCommentsTabIndex(newValue);
  };

  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">Reviews & Comments</Typography>
      </Box>
      <Box paddingBottom={2}>
        <Tabs
          value={index}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Pickflix" />
          <Tab label="Youtube" />
          <Tab label="TMDb" />
        </Tabs>
      </Box>

      <TabPanel value={index} index={0}>
        <MovieReviewList mediaId={mediaId} />
      </TabPanel>
      <TabPanel value={index} index={1}>
        <YoutubeCommentList videoId={videoState.currentVideo?.key} />
      </TabPanel>
      <TabPanel value={index} index={2}>
        <TmdbReviewCardList mediaId={mediaId} />
      </TabPanel>
    </React.Fragment>
  );
};
