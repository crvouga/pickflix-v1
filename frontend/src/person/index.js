import { Box, Typography } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import api from "../api";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import Page from "../common/page/Page";
import recentlyViewed from "../common/redux/recentlyViewed";
import MoviePosterScroll from "../movie/components/PosterScroll";
import Filmography from "./Filmography";
import Header from "./Header";
import SkeletonPage from "./SkeletonPage";
const fetchPersonPage = (personId) =>
  api
    .get(`/api/tmdb/person/${personId}`, {
      params: {
        appendToResponse: [
          "credits",
          "movie_credits",
          "images",
          "tagged_images",
        ],
      },
    })
    .then((res) => res.data);

const toCreditsByKey = (credits) => {
  const { cast, crew } = credits;
  const creditsByKey = R.groupBy(R.prop("department"), crew);
  if (cast.length > 0) creditsByKey["Acting"] = cast;
  if (R.keys(creditsByKey) > 1) creditsByKey["All"] = R.concat(cast, crew);
  return creditsByKey;
};

const descendPopularity = R.sort(R.descend(R.prop("popularity")));

export default () => {
  const { personId } = useParams();

  const query = useQuery(`/person/${personId}`, () =>
    fetchPersonPage(personId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.status === "success") {
      dispatch(recentlyViewed.actions.viewed("person", query.data));
    }
  }, [query.status]);

  if (query.status === "loading") return <SkeletonPage />;
  if (query.status === "error") return <ErrorPage />;

  const { credits, images, taggedImages, ...details } = query.data;

  const creditsByKey = R.map(descendPopularity, toCreditsByKey(credits));

  return (
    <Page>
      <Header
        details={details}
        credits={credits}
        images={images}
        taggedImages={taggedImages}
      />

      <MoviePosterScroll
        title="Known For"
        movies={creditsByKey[details.knownForDepartment]}
      />

      <Filmography credits={credits} details={details} />

      <Footer />
    </Page>
  );
};
