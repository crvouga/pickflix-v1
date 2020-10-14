import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import NavigationBar from "../navigation/NavigationBar";
import ListItemsSection from "./ListItemsSection";
import { getWatchNextList, queryKeys } from "./query";

export default () => {
  const query = useQuery(queryKeys.watchNextList(), () => getWatchNextList());

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const list = query.data;

  return (
    <React.Fragment>
      <NavigationBar title={list.title} AppBarProps={{ position: "sticky" }} />
      <Paper>
        <Box p={2} paddingY={4} display="flex" flexDirection="row">
          <Box>
            <Typography variant="h5">{list.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              A list of movies you want to watch next.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <ListItemsSection listId={list.id} />
    </React.Fragment>
  );
};
