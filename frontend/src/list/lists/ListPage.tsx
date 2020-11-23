import {
  AppBar,
  Container,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import BackButton from "../../app/navigation/BackButton";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";
import EmptyPage from "../../common/page/EmptyPage";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import ListItemsSection from "../list-items/ListItemsSection";
import { useQueryLists } from "../query";
import ListSection from "./ListSection";

export default () => {
  const { listId } = useParams<{ listId: string }>();
  const query = useQueryLists({ id: listId });

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const lists = query.data;

  if (lists[0] && lists[0].results.length === 0) {
    return <EmptyPage />;
  }

  const list = lists[0].results[0];

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
          <ListSection list={list} />
        </Container>
      </Paper>

      <Container disableGutters maxWidth="md">
        <ListItemsSection
          owner={list.owner}
          listId={list.list.id}
          listItemCount={list.listItemCount}
        />
      </Container>
    </React.Fragment>
  );
};
