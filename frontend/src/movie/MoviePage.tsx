import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import usePageHistory from "../home/page-history/usePageHistory";
import BackButton from "../navigation/BackButton";
import { APP_BAR_HEIGHT } from "../navigation/constants";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import makeImageUrl from "../tmdb/makeImageUrl";
import VideoPlayer from "../video/VideoPlayer";
import MovieCredits from "./credits/MovieCredits";
import MovieCollection from "./MovieCollection";
import MovieDetails from "./MovieDetails";
import { useQueryMovie } from "./query";
import MovieRelated from "./related/MovieRelated";
import ReviewsAndComments from "./review/ReviewsAndComments";
import MovieVideo from "./video/MovieVideo";

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.appBar - 1,
  },
}));

export default () => {
  const classes = useStyles();

  const isStickyPlayer = useBoolean(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const query = useQueryMovie({ tmdbMediaId });

  const pageHistory = usePageHistory();
  useEffect(() => {
    if (query.data) {
      pageHistory.push({ mediaType: "movie", ...query.data });
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

  const backdrop = makeImageUrl(2, { backdropPath: query.data.backdropPath });

  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <BackButton />
            <Box flex={1}>
              <Typography variant="h6" noWrap>
                {details.title}
              </Typography>
            </Box>
            <Switch
              checked={isStickyPlayer.value}
              onClick={() => {
                console.log("TOGGLE");
                isStickyPlayer.toggle();
              }}
            />
          </Toolbar>
        </AppBar>
      </Hidden>

      <Container
        disableGutters
        maxWidth="md"
        className={clsx({ [classes.sticky]: isStickyPlayer.value && isMobile })}
      >
        <VideoPlayer light={backdrop} />
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
        <MovieCredits credits={credits} />

        {details.belongsToCollection && (
          <MovieCollection collectionId={details.belongsToCollection.id} />
        )}

        <MovieRelated
          tmdbMediaId={details.id}
          similar={similar}
          recommendations={recommendations}
        />

        <ReviewsAndComments tmdbMediaId={details.id} />
      </Container>
    </React.Fragment>
  );
};
