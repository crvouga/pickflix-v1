import { Container, Hidden, Paper } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import ListItemsSection from "../list-items/ListItemsSection";
import ListPageAppBar from "../ListPageAppBar";
import { toAutoListName } from "../query";
import { useQueryAutoLists } from "../query/hooks";
import AutoListSection from "./AutoListSection";

export default () => {
  const { autoListId } = useParams<{ autoListId: string }>();

  const query = useQueryAutoLists({
    id: autoListId,
  });

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const autoList = query.data[0];

  if (!autoList) {
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <ListPageAppBar title={toAutoListName(autoList.list.key)} />
      </Hidden>

      <Paper>
        <Container maxWidth="md">
          <AutoListSection autoList={autoList} />
        </Container>
      </Paper>

      <Container disableGutters maxWidth="md">
        <ListItemsSection
          owner={autoList.owner}
          listItemCount={autoList.listItemCount}
          listId={autoList.list.id}
        />
      </Container>
    </React.Fragment>
  );
};
