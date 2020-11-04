import {
  AppBar,
  Container,
  Hidden,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import usePageHistory from "../home/page-history/usePageHistory";
import BackButton from "../navigation/BackButton";
import NavigationDesktop from "../navigation/Navigation.Desktop";
import NavigationMobile from "../navigation/Navigation.Mobile";
import PersonCredits from "./credits/PersonCredits";
import PersonDetails from "./PersonDetails";
import { getPersonPage, queryKeys } from "./query";

export default () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const query = useQuery(queryKeys.personPage(tmdbMediaId), () =>
    getPersonPage(tmdbMediaId)
  );

  const pageHistory = usePageHistory();
  useEffect(() => {
    if (query.data) {
      pageHistory.push({ mediaType: "person", ...query.data });
    }
  }, [query.data]);

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const { credits, images, ...details } = query.data;

  return (
    <React.Fragment>
      <Hidden xsDown>
        <NavigationDesktop />
      </Hidden>
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <BackButton edge="start" />
            <Typography variant="h6">{details.name}</Typography>
          </Toolbar>
        </AppBar>
        <NavigationMobile />
      </Hidden>

      <Container disableGutters maxWidth="md">
        <PersonDetails details={details} />
        <PersonCredits details={details} credits={credits} />
      </Container>
    </React.Fragment>
  );
};
