import {
  AppBar,
  Box,
  Container,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import BackButton from "../../navigation/BackButton";
import ResponsiveNavigation from "../../navigation/ResponsiveNavigation";
import useCurrentUser from "../../users/useCurrentUser";
import ListItemsSection from "../ListItemsSection";
import {
  getAutoList,
  queryKeys,
  toAutoListName,
  AutoListKeys,
  getUsersAutoList,
} from "../query";
import AutoListIcon from "./AutoListIcon";
import ChipUser from "../../users/ChipUser";

export default () => {
  const { username, autoListKey } = useParams<{
    username: string;
    autoListKey: AutoListKeys;
  }>();

  const query = useQuery(
    queryKeys.userAutoList({ username, autoListKey }),
    () => getUsersAutoList({ username, autoListKey })
  );

  const currentUser = useCurrentUser();

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data || currentUser === "loading") {
    return <LoadingPage />;
  }

  const autoList = query.data;
  const isCurrentUser = currentUser && currentUser.id === autoList.owner.id;

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

      <Box paddingBottom={2}>
        <Paper>
          <Container maxWidth="md">
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <Box
                width="150px"
                paddingBottom={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <AutoListIcon
                  style={{ width: "65px", height: "65px" }}
                  autoListKey={autoList.list.key}
                />
              </Box>
              <Box paddingBottom={1}>
                <Typography variant="h5" style={{ wordBreak: "break-all" }}>
                  {toAutoListName(autoList.list.key)}
                </Typography>
              </Box>
              <Box paddingBottom={1}>
                <ChipUser user={autoList.owner} />
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
      <Container disableGutters maxWidth="md">
        <ListItemsSection listId={autoList.list.id} />
      </Container>
    </React.Fragment>
  );
};
