import {
  AppBar,
  Container,
  Hidden,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import BackButton from "../navigation/BackButton";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import { useQueryCurrentUser } from "../users/query/hooks";
import ListItemsSection from "./list-items/ListItemsSection";
import ListSection from "./lists/ListSection";
import { useQueryLists } from "./query";

export default () => {
  const { listId } = useParams<{ listId: string }>();
  const query = useQueryLists({ id: listId });
  const queryCurrentUser = useQueryCurrentUser();

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data || queryCurrentUser.data === undefined) {
    return <LoadingPage />;
  }

  const list = query.data[0].results[0];
  const currentUser = queryCurrentUser.data;

  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <BackButton />
            <Typography variant="h6" noWrap>
              {list.list.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Paper>
        <Container disableGutters maxWidth="md">
          <ListSection list={list} currentUser={currentUser} />
        </Container>
      </Paper>

      <Container disableGutters maxWidth="md">
        <Box p={1}>
          <ListItemsSection
            listId={list.list.id}
            listItemCount={list.listItemCount}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};
