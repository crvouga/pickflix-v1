import { ButtonBase, Collapse, Divider, makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import ExpandIcon from "../../common/ExpandIcon";
import PageHistory from "../../common/PageHistory";
import useBoolean from "../../common/useBoolean";
import Header from "./Header";
import MovieActions from "./MovieActions";
import MovieCollection from "./MovieCollection";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import MovieDetailsPreview from "./MovieDetailsPreview";
import MovieFeed from "./MovieFeed";
import MoviePageLoading from "./MoviePageLoading";
import MovieReviews from "./MovieReviews";
import Videos from "./Videos";

const useStyles = makeStyles((theme) => ({
  details: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    width: "100%",
  },
  expandIcon: {
    marginTop: 0,
  },
  spinnerContainer: {
    textAlign: "center",
    marginTop: theme.spacing(8),
  },

  loading: {
    width: "100%",
  },
}));

const fetchMoviePage = (movieId) =>
  axios
    .get(`/tmdb/movie/${movieId}`, {
      params: {
        appendToResponse: [
          "credits",
          "reviews",
          "similar",
          "recommendations",
          "keywords",
          "videos",
          "images",
        ],
      },
    })
    .then((response) => response.data);

export default () => {
  const classes = useStyles();
  //
  const location = useLocation();

  const { movieId } = useParams();
  const queryKey = location.pathname;
  const query = useQuery(queryKey, () => fetchMoviePage(movieId), {});
  //
  const isDetailsOpen = useBoolean();

  if (query.status === "loading") {
    return <MoviePageLoading />;
  }

  if (query.status === "error") {
    return "error";
  }

  const {
    credits,
    reviews,
    keywords,
    images,
    similar,
    videos: { results: videos },
    recommendations,
    ...details
  } = query.data;

  return (
    <React.Fragment>
      {images.backdrops.length > 0 && (
        <Header videos={videos} images={images} />
      )}

      <ButtonBase
        component="div"
        onClick={isDetailsOpen.toggle}
        className={classes.details}
      >
        <MovieDetailsPreview details={details} />
        <ExpandIcon
          className={classes.expandIcon}
          expanded={isDetailsOpen.value}
        />
      </ButtonBase>

      <MovieActions />

      <Collapse in={isDetailsOpen.value}>
        <MovieDetails details={details} />
      </Collapse>
      <Divider />

      <Videos videos={videos} />
      <Divider />

      <MovieCredits credits={credits} />
      <Divider />

      <MovieCollection details={details} />
      <Divider />

      <MovieFeed
        keywords={keywords}
        similar={similar}
        recommendations={recommendations}
      />
      <Divider />

      <MovieReviews reviews={reviews} />
      <Divider />

      <PageHistory />
    </React.Fragment>
  );
};
