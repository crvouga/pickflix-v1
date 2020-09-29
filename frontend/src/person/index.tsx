import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import Page from "../common/page/Page";
import { actions } from "../redux";
import { PersonDetails, PersonMovieCredits } from "../tmdb/types";
import Biography from "./Biography";
import Filmography from "./Filmography";
import Header from "./Header";
import SkeletonPage from "./SkeletonPage";

const fetchPersonPage = (personId: string) =>
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

export default () => {
  const { personId } = useParams<{ personId: string }>();

  const query = useQuery(`/person/${personId}`, () =>
    fetchPersonPage(personId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.status === "success") {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "person", ...query.data })
      );
    }
  }, [query, dispatch]);

  if (query.status === "loading") return <SkeletonPage />;
  if (query.status === "error") return <ErrorPage />;

  const {
    credits,
    ...details
  }: {
    credits: PersonMovieCredits;
  } & PersonDetails = query.data;

  return (
    <Page>
      <Header details={details} credits={credits} />
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
