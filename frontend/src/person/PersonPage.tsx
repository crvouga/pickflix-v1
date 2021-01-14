import {
  AppBar,
  Container,
  Hidden,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import BackButton from "../app/navigation/BackButton";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import Page from "../common/page/Page";
import PersonCredits from "./credits/PersonCredits";
import PersonDetails from "./PersonDetails";
import { getPersonPage, queryKeys } from "./query";

export default () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const query = useQuery(queryKeys.personPage(tmdbMediaId), () =>
    getPersonPage(tmdbMediaId)
  );

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const { credits, images, ...details } = query.data;

  return (
    <Page>
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <BackButton edge="start" />
            <Typography variant="h6">{details.name}</Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <PersonDetails details={details} />

      <Container disableGutters maxWidth="md">
        <PersonCredits details={details} credits={credits} />
      </Container>
    </Page>
  );
};
