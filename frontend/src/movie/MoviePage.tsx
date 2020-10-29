import {
  makeStyles,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Hidden,
} from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import MovieIcon from "@material-ui/icons/Movie";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";

import { history as historyDuck } from "../navigation/history/history";
import ActionBarSection from "./action-bar/ActionBarSection";
import CollectionSection from "./collection/CollectionSection";
import CreditsSection from "./credits/CreditsSection";
import { useMoviePageQuery, useQueryMovie } from "./data";
import DetailsSection from "./details/DetailsSection";
import DiscoverSection from "./discover/DiscoverSection";
import HeaderSection from "./header/HeaderSection";
import RelatedMoviesSection from "./related-movies/RelatedMoviesSection";
import ReviewSection from "./review/ReviewSection";
import VideosSection from "./video/VideosSection";
import NavigationBar from "../navigation/NavigationBar";
import CurrentVideoPlayer from "../video/CurrentVideoPlayer";
import MoviePosterCard from "./components/MoviePosterCard";
import { video } from "../video/redux/video";
import useCurrentVideo from "../video/useCurrentVideo";
import ReactPlayer from "react-player";
import * as youtubeAPI from "../youtube/api";
import { useParams, useHistory } from "react-router";
import AspectRatio from "../common/components/AspectRatio";

import {
  toReleaseYear,
  toCertification,
  toRevenue,
  SMALL_DOT,
  toRuntime,
  toBudget,
} from "./utils";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CreditsListCard from "./credits/CreditsListCard";
import HorizontalScroll from "../common/components/HorizontalScroll";
import { APP_BAR_HEIGHT } from "../navigation/NavBar";
import NavBar from "../navigation/NavBar";
const useStyles = makeStyles((theme) => ({
  sticky: {
    [theme.breakpoints.down("xs")]: {
      position: "sticky",
      top: APP_BAR_HEIGHT,
      zIndex: theme.zIndex.appBar - 1,
    },
  },
  body: {
    backgroundColor: theme.palette.background.default,
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();
  const currentVideo = useCurrentVideo();

  return (
    <AspectRatio ratio={[16, 9]}>
      <ReactPlayer
        width="100%"
        height="100%"
        onPlay={() => currentVideo.setIsPlaying(true)}
        onPause={() => currentVideo.setIsPlaying(false)}
        url={youtubeAPI.videoKeyToEmbedURL(currentVideo.currentVideo?.key)}
        controls={true}
      />
    </AspectRatio>
  );
};

export default () => {
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const { data, error } = useQueryMovie({ tmdbMediaId });
  const dispatch = useDispatch();
  const currentVideo = useCurrentVideo();
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      dispatch(
        historyDuck.actions.push({
          mediaType: "movie",
          id: data.id,
          posterPath: data.posterPath,
          title: data.title,
        })
      );

      currentVideo.setCurrentVideo(data.videos.results[0]);
      currentVideo.setPlaylist(data.videos.results);
    }
  }, [dispatch, currentVideo, data]);

  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <NavBar />

      <Container disableGutters maxWidth="md" className={classes.sticky}>
        <VideoPlayer />
      </Container>

      <Container disableGutters maxWidth="md">
        <Box>
          <Box>
            {currentVideo.currentVideo && (
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={youtubeAPI.videoKeyToThumbnailURL(
                        currentVideo.currentVideo.key
                      )}
                    >
                      <MovieIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={currentVideo.currentVideo.name}
                    secondary={currentVideo.currentVideo.type}
                  />
                  <ListItemSecondaryAction>
                    <MenuOpenIcon />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            )}
            {/* <List>
              {data.videos.results.map((video) => (
                <ListItem
                  key={video.key}
                  button
                  onClick={() => {
                    currentVideo.setCurrentVideo(video);
                    currentVideo.setIsPlaying(true);
                  }}
                  selected={currentVideo.currentVideo?.key === video.key}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={youtubeAPI.videoKeyToThumbnailURL(video.key)}
                    >
                      <MovieIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={video.name} secondary={video.type} />
                  <ListItemSecondaryAction>
                    {currentVideo.currentVideo?.key === video.key &&
                    currentVideo.isPlaying ? (
                      <PauseIcon />
                    ) : (
                      <PlayArrowIcon />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List> */}
          </Box>

          <Box>
            <Box p={2}>
              <Typography variant="h5">{data.title}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                {[
                  toReleaseYear(data),
                  toCertification(data),
                  toRuntime(data),
                  data.status,
                ].join(` ${SMALL_DOT} `)}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {data.overview}
              </Typography>
              <Box marginBottom={1}>
                <Typography component="span" color="textPrimary">
                  Box Office:{" "}
                </Typography>
                <Typography component="span" color="textSecondary">
                  {toRevenue(data)}
                </Typography>
              </Box>
              <Box marginBottom={1}>
                <Typography component="span" color="textPrimary">
                  Budget:{" "}
                </Typography>
                <Typography component="span" color="textSecondary">
                  {toBudget(data)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box paddingLeft={2}>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
        </Box>
        <HorizontalScroll paddingLeft={2} marginBottom={2}>
          {data.credits.cast.map((credit) => (
            <Box
              key={credit.id}
              maxWidth="150px"
              minWidth="150px"
              marginRight={1}
            >
              <CreditsListCard credit={credit} />
            </Box>
          ))}
        </HorizontalScroll>
        <Box paddingLeft={2}>
          <Typography variant="h6" gutterBottom>
            Crew
          </Typography>
        </Box>
        <HorizontalScroll paddingLeft={2}>
          {data.credits.crew.map((credit) => (
            <Box
              key={credit.id}
              maxWidth="150px"
              minWidth="150px"
              marginRight={1}
            >
              <CreditsListCard credit={credit} />
            </Box>
          ))}
        </HorizontalScroll>
      </Container>
    </React.Fragment>
  );
};
