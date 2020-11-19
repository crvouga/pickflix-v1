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
import AutoListSection from "./auto-lists/AutoListSection";
import ListItemsSection from "./list-items/ListItemsSection";
import { toAutoListName } from "./query";
import { useQueryAutoLists } from "./query/hooks";

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
        <Box p={1}>
          <ListItemsSection
            listItemCount={autoList.listItemCount}
            listId={autoList.list.id}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};
