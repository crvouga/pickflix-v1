import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import NavBar, { APP_BAR_HEIGHT } from "../navigation/NavBar";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import useVideoState from "../video/useVideoState";
import VideoPlayer from "../video/VideoPlayer";
import { useQueryMovie } from "./data";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import MovieRelated from "./MovieRelated";
import ReviewsAndComments from "./review/ReviewsAndComments";
import MovieVideo from "./video/MovieVideo";
import MovieCollection from "./MovieCollection";

const useStyles = makeStyles((theme) => ({
  sticky: {
    [theme.breakpoints.down("xs")]: {
      position: "sticky",
      top: APP_BAR_HEIGHT,
      zIndex: theme.zIndex.appBar - 1,
    },
  },
  columns: {
    display: "flex",
    flexDirection: "row-reverse",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  body: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default () => {
  const classes = useStyles();
  const makeImageUrl = useMakeImageUrl();
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const { data, error } = useQueryMovie({ tmdbMediaId });

  const videoState = useVideoState();
  useEffect(() => {
    if (data) {
      videoState.setCurrentVideo(data.videos.results[0]);
      videoState.setPlaylist(data.videos.results);
      videoState.setError(undefined);
    }
  }, [Boolean(data)]);

  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return <LoadingPage />;
  }

  const backdrop = makeImageUrl(2, { backdropPath: data.backdropPath });

  return (
    <React.Fragment>
      <NavBar />

      <Container disableGutters maxWidth="md" className={classes.sticky}>
        <VideoPlayer light={backdrop} />
      </Container>

      <Container disableGutters maxWidth="md" className={classes.columns}>
        <Grid container direction="row-reverse">
          <Grid item xs={12} sm={6}>
            <MovieVideo />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MovieDetails data={data} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" disableGutters>
        <MovieCredits credits={data.credits} />

        {data.belongsToCollection && (
          <MovieCollection collectionId={data.belongsToCollection.id} />
        )}

        <MovieRelated
          similar={data.similar}
          recommendations={data.recommendations}
        />
        <ReviewsAndComments tmdbMediaId={data.id} />
      </Container>
    </React.Fragment>
  );
};
