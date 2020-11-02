import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import ReviewList from "../../reviews/ReviewList";
import useVideoState from "../../video/useVideoState";
import TmdbMovieReviews from "./TmdbMovieReviews";
import YoutubeComments from "./YoutubeComments";

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

export default ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  const videoState = useVideoState();

  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">Reviews & Comments</Typography>
      </Box>
      <Box paddingBottom={2}>
        <Tabs
          value={value}
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

      <TabPanel value={value} index={0}>
        <ReviewList tmdbMediaId={tmdbMediaId} tmdbMediaType="movie" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <YoutubeComments videoId={videoState.currentVideo?.key} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TmdbMovieReviews tmdbMediaId={tmdbMediaId} />
      </TabPanel>
    </React.Fragment>
  );
};
