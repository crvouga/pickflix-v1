import { Typography, Box } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import Page from "../common/page/Page";
import recentlyViewed from "../redux/recentlyViewed";
import Poster from "../movie/components/Poster";
import Biography from "./Biography";
import Filmography from "./Filmography";
import Header from "./Header";
import SkeletonPage from "./SkeletonPage";

const fetchPersonPage = (personId) =>
  backendAPI
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
      {/* <Box paddingLeft={2} paddingBottom={1}>
        <Typography style={{ fontWeight: "bold" }}>
          Known For {details.knownForDepartment}
        </Typography>
      </Box>
      <HorizontalScroll paddingLeft={2}>
        {R.propOr([], details.knownForDepartment, creditsByKey).map(
          (movie, index) => (
            <Poster key={index} movie={movie} marginRight={2} />
          )
        )}
      </HorizontalScroll> */}

      <Biography details={details} />
      <Filmography credits={credits} details={details} />
      <Footer />
    </Page>
  );
};
