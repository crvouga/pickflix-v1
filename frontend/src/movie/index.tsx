import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavigationBarFadeIn from "../common/NavigationBarFadeIn";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import { actions } from "../redux";
import ActionBarSection from "./action-bar/ActionBarSection";
import CollectionSection from "./collection/CollectionSection";
import CreditsSection from "./credits/CreditsSection";
import { useMoviePageQuery } from "./data";
import DetailsSection from "./details/DetailsSection";
import DiscoverSection from "./discover/DiscoverSection";
import HeaderSection from "./header/HeaderSection";
import RelatedMoviesSection from "./related-movies/RelatedMoviesSection";
import ReviewSection from "./review/ReviewSection";
import VideosSection from "./video/VideosSection";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default () => {
  const classes = useStyles();
  const query = useMoviePageQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (query.data) {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "movie", ...query.data })
      );
    }
  }, [dispatch, query.data, query.status]);

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <NavigationBarFadeIn title={query.data.title} />
      <HeaderSection />
      <div className={classes.body}>
        <ActionBarSection />
        <VideosSection />
        <DetailsSection />
        <CreditsSection />
        <CollectionSection />
        <RelatedMoviesSection />
        <DiscoverSection />
        <ReviewSection />
      </div>
    </React.Fragment>
  );
};
