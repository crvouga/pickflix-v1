import {
  AppBar,
  Container,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import BackButton from "../navigation/BackButton";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import AutoListSection from "./auto-lists/AutoListSection";
import ListItemsSection from "./list-items/ListItemsSection";
import { getAutoList, queryKeys, toAutoListName } from "./query";

export default () => {
  const { autoListId } = useParams<{ autoListId: string }>();

  const query = useQuery(queryKeys.autoList({ autoListId }), () =>
    getAutoList({ autoListId })
  );

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const autoList = query.data;

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <BackButton />
            <Typography variant="h6" noWrap>
              {toAutoListName(autoList.list.key)}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Paper>
        <Container maxWidth="md">
          <AutoListSection autoList={autoList} />
        </Container>
      </Paper>

      <Container disableGutters maxWidth="md">
        <ListItemsSection listId={autoList.list.id} />
      </Container>
    </React.Fragment>
  );
};
