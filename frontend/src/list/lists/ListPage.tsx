import { Container, Hidden, Paper } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";
import EmptyPage from "../../common/page/EmptyPage";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import ListItemsSection from "../list-items/ListItemsSection";
import ListPageAppBar from "../ListPageAppBar";
import { useQueryLists } from "../query";
import ListSection from "./ListSection";

export default () => {
  const { listId } = useParams<{ listId: string }>();
  const query = useQueryLists({ listId: listId });

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const lists = query.data;

  if (lists[0] && lists[0].results.length === 0) {
    return (
      <EmptyPage
        title="Could not find list"
        subtitle="This probably means the list was deleted"
      />
    );
  }

  const list = lists[0].results[0];

  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <Hidden smUp>
        <ListPageAppBar title={list.list.title} />
      </Hidden>

      <Paper>
        <Container disableGutters maxWidth="md">
          <ListSection list={list} />
        </Container>
      </Paper>

      <Container disableGutters maxWidth="md">
        <ListItemsSection list={list} />
      </Container>
    </React.Fragment>
  );
};
