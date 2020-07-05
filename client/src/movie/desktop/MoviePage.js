import {
  Collapse,
  Fade,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import * as R from "ramda";

import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { videoKeyToURL } from "../../utils";

import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import MovieOther from "./MovieOther";
import MovieReviews from "./MovieReviews";
import MovieVideos from "./MovieVideos";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  blinking: {
    animationName: "$blinker",
    animationDuration: "0.8s",
    animationTimingFunction: "ease-in-out	",
    animationIterationCount: "infinite",
  },

  "@keyframes blinker": {
    "0%": { opacity: 0.4 },
    "50%": { opacity: 0.8 },
    "100%": { opacity: 0.4 },
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: "calc((9 / 16) * 100vw)",
    maxHeight: "500px",
  },

  player: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  movieTile: {
    borderRadius: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ minHeight: 480 }}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in>
          <div>{children}</div>
        </Fade>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default () => {
  const classes = useStyles();
  const { id } = useParams();

  const videosQuery = useQuery(
    ["movie", id, "videos"],
    () => axios.get(`/tmdb/movie/${id}/videos`).then((res) => res.data),
    {}
  );

  const pageLoadSucceeded = R.all(R.whereEq({ status: "success" }), [
    videosQuery,
  ]);

  const videos = R.pathOr([], ["data", "results"], videosQuery);

  const [selectedVideo, setSelectedVideo] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlayerHidden, setIsVideoPlayerHidden] = useState(true);
  useEffect(() => {
    if (videoCount > 0) {
      setSelectedVideo(R.head(videos));
    }
  }, [R.path([0, "key"], videos)]);

  const videoCount = R.propOr(0, "length", videos);
  const url = videoKeyToURL(selectedVideo.key);

  const hidePlayer = () => {
    setIsVideoPlayerHidden((isVideoPlayerHidden) => {
      setIsPlaying(R.not(isVideoPlayerHidden));
      return R.not(isVideoPlayerHidden);
    });
  };
  const onVideoClick = (video) => {
    if (video.key === selectedVideo.key) {
      setIsPlaying(R.not);
    } else {
      setIsPlaying(true);
      setSelectedVideo(video);
    }
  };

  const isAnyModalOpen = false;
  const theme = useTheme();

  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const style = {
    ...(isAnyModalOpen
      ? {
          pointerEvents: "none",
        }
      : {}),
  };

  const tabNames = ["Videos", "Overview", "Credits", "Movies", "Reviews"];
  const tabByName = {
    Overview: <MovieDetails />,
    Videos: (
      <MovieVideos
        hidePlayer={hidePlayer}
        isPlaying={isPlaying}
        videos={videos}
        selectedVideo={selectedVideo}
        onVideoClick={onVideoClick}
      />
    ),
    Movies: <MovieOther />,
    Reviews: <MovieReviews />,
    Credits: <MovieCredits />,
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setValue(tabNames.indexOf("Overview"));
  }, [id]);
  const movieDetailsQuery = useQuery(
    ["movie", id, "details"],
    () => axios.get(`/tmdb/movie/${id}`).then((res) => res.data),
    {}
  );

  const movieDetails = R.pathOr({}, ["data"], movieDetailsQuery);

  return (
    <div>
      <Fade in>
        <React.Fragment>
          <Collapse style={style} in={true}>
            <Paper id="movie-video-player" className={classes.wrapper}>
              <ReactPlayer
                className={classes.player}
                width="100%"
                height="100%"
                controls
                playing={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                url={url}
              />
            </Paper>
          </Collapse>
          <Paper>
            <Tabs
              id="movie-tab-bar"
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabNames.map((label, index) => (
                <Tab label={label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Paper>

          {tabNames.map((name, index) => (
            <TabPanel value={value} index={index}>
              {tabByName[name]}
            </TabPanel>
          ))}
        </React.Fragment>
      </Fade>
    </div>
  );
};
