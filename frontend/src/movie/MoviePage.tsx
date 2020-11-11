import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@material-ui/icons/ToggleOnOutlined";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import usePageHistory from "../home/page-history/usePageHistory";
import BackButton from "../navigation/BackButton";
import { APP_BAR_HEIGHT } from "../navigation/constants";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import makeImageUrl from "../tmdb/makeImageUrl";
import useVideoState from "../video/useVideoState";
import VideoPlayer from "../video/VideoPlayer";
import MovieCredits from "./credits/MovieCredits";
import MovieCollection from "./MovieCollection";
import MovieDetails from "./MovieDetails";
import { useQueryMovie } from "./query";
import useMoviePageUiState from "./redux/useMoviePageUiState";
import MovieRelated from "./related/MovieRelated";
import ReviewsAndComments from "./review/ReviewsAndComments";
import ReviewsSummary from "./review/ReviewsSummary";
import MovieVideo from "./video/MovieVideo";
import YourReview from "./review/YourReview";

const ToggleIcon = ({ on }: { on: boolean }) => {
  return on ? <ToggleOnOutlinedIcon /> : <ToggleOffOutlinedIcon />;
};
const useStyles = makeStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.appBar - 1,
  },
}));

export default () => {
  const classes = useStyles();

  const moviePageUiState = useMoviePageUiState();
  const videoState = useVideoState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    videoState.setIsPlaying(moviePageUiState.isVideoPlayerSticky);
    if (moviePageUiState.isVideoPlayerSticky && videoState.light) {
      videoState.setLight(undefined);
    }
  }, [moviePageUiState.isVideoPlayerSticky]);

  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const query = useQueryMovie({ tmdbMediaId });

  const pageHistory = usePageHistory();
  useEffect(() => {
    if (query.data) {
      pageHistory.push({ mediaType: "movie", ...query.data });
      const backdrop = makeImageUrl(2, {
        backdropPath: query.data.backdropPath,
      });
      videoState.setLight(backdrop);
    }
  }, [query.data]);

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const {
    credits,
    images,
    videos,
    similar,
    recommendations,
    releaseDates,
    keywords,
    ...details
  } = query.data;

  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <BackButton />

            <Typography variant="h6" noWrap style={{ flex: 1 }}>
              {details.title}
            </Typography>

            <IconButton
              onClick={() => {
                moviePageUiState.toggleIsVideoPlayerSticky();
              }}
            >
              <ToggleIcon on={moviePageUiState.isVideoPlayerSticky} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Container
        disableGutters
        maxWidth="md"
        className={clsx({
          [classes.sticky]: moviePageUiState.isVideoPlayerSticky && isMobile,
        })}
      >
        <VideoPlayer />
      </Container>

      <Container disableGutters maxWidth="md">
        <Grid container direction="row-reverse">
          <Grid item xs={12} sm={6}>
            <MovieVideo tmdbMediaId={details.id} videos={videos} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MovieDetails releaseDates={releaseDates} details={details} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" disableGutters>
        <Box paddingBottom={2}>
          <MovieCredits credits={credits} />
        </Box>
        {details.belongsToCollection && (
          <Box paddingBottom={2}>
            <MovieCollection collectionId={details.belongsToCollection.id} />
          </Box>
        )}

        <Box paddingBottom={2}>
          <MovieRelated
            tmdbMediaId={details.id}
            similar={similar}
            recommendations={recommendations}
          />
        </Box>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box paddingBottom={2}>
              <ReviewsSummary tmdbMediaId={details.id} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box paddingBottom={2}>
              <YourReview tmdbMediaId={details.id} tmdbMediaType="movie" />
            </Box>
          </Grid>
        </Grid>

        <ReviewsAndComments tmdbMediaId={details.id} />
      </Container>
    </React.Fragment>
  );
};
