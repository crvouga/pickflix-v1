import {
  AppBar,
  Box,
  Container,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import { useQueryCurrentUser } from "../user/query/hooks";
import CurrentUserMovies from "./CurrentUserMovies";
import NonCurrentUserMovies from "./NonCurrentUserMovies";
import PageHistory from "./page-history/PageHistory";
import usePageHistory from "./page-history/usePageHistory";

export default () => {
  const queryCurrentUser = useQueryCurrentUser();
  const pageHistory = usePageHistory();

  return (
    <React.Fragment>
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Box width="100%" display="flex" justifyContent="center">
              <PickflixLogo />
            </Box>
          </Toolbar>
        </AppBar>
      </Hidden>
      <ResponsiveNavigation />

      <Container disableGutters maxWidth="md">
        {pageHistory.entities.length > 0 && (
          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItem>
            <PageHistory />
          </Box>
        )}

        {queryCurrentUser.data && (
          <CurrentUserMovies user={queryCurrentUser.data} />
        )}

        <NonCurrentUserMovies />
      </Container>
    </React.Fragment>
  );
};
