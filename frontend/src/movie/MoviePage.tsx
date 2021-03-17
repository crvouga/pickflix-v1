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
import BackButton from "../app/navigation/BackButton";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import Page from "../common/page/Page";
import usePageHistory from "../home/page-history/usePageHistory";
import makeImageUrl from "../media/tmdb/makeImageUrl";
import { MediaId, TmdbMediaType } from "../media/tmdb/types";
import useVideoState from "../media/video/useVideoState";
import VideoPlayer from "../media/video/VideoPlayer";
import MovieCredits from "./credits/MovieCredits";
import MovieDiscover from "./discover/MovieDiscover";
import MovieCollection from "./MovieCollection";
import MovieDetails from "./MovieDetails";
import { useQueryMoviePage } from "./query";
import useMoviePageUi from "./redux/useMoviePageUi";
import MovieRelated from "./related/MovieRelated";
import ReviewsAndComments from "./review/ReviewsAndComments";
import ReviewsSummary from "./review/ReviewsSummary";
import YourReview from "./review/YourReview";
import MovieVideo from "./video/MovieVideo";

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

  const moviePageUi = useMoviePageUi();
  const videoState = useVideoState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    videoState.setIsPlaying(moviePageUi.isVideoPlayerSticky);
  }, [moviePageUi.isVideoPlayerSticky]);

  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const mediaId: MediaId = {
    tmdbMediaId: Number(tmdbMediaId),
    tmdbMediaType: TmdbMediaType.movie,
  };

  const query = useQueryMoviePage({ mediaId });

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

    releaseDates,
    keywords,
    ...details
  } = query.data;

  return (
    <Page>
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar style={{ height: APP_BAR_HEIGHT }}>
            <BackButton />

            <Typography variant="h6" noWrap style={{ flex: 1 }}>
              {details.title}
            </Typography>

            <IconButton
              onClick={() => {
                moviePageUi.toggleIsVideoPlayerSticky();
              }}
            >
              <ToggleIcon on={moviePageUi.isVideoPlayerSticky} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>

      {videos.results.length > 0 && (
        <Container
          disableGutters
          maxWidth="md"
          className={clsx({
            [classes.sticky]: moviePageUi.isVideoPlayerSticky && isMobile,
          })}
        >
          <VideoPlayer />
        </Container>
      )}

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

        <MovieDiscover
          releaseDates={releaseDates}
          details={details}
          credits={credits}
          keywords={keywords}
        />

        {details.belongsToCollection && (
          <Box paddingBottom={2}>
            <MovieCollection collectionId={details.belongsToCollection.id} />
          </Box>
        )}

        <Box paddingBottom={2}>
          <MovieRelated tmdbMediaId={details.id} />
        </Box>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box paddingBottom={2}>
              <ReviewsSummary mediaId={mediaId} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box paddingBottom={2}>
              <YourReview mediaId={mediaId} />
            </Box>
          </Grid>
        </Grid>

        <ReviewsAndComments mediaId={mediaId} />
      </Container>
    </Page>
  );
};
