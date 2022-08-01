import {
  AppBar,
  Box,
  Container,
  Hidden,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";
import EmptyPage from "../common/page/EmptyPage";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import Page from "../common/page/Page";
import WithAuthentication from "./auth/WithAuthentication";
import AvatarUser from "./components/AvatarUser";
import CurrentUserActions, {
  OpenCurrentUserActionsModalButton,
} from "./CurrentUserActions";
import { useQueryUsers, UserAggergation } from "./query";
import TabsAndTabPanels from "./TabsAndTabPanels";

export const makeUserPageRoute = ({ userId }: { userId: string }) =>
  `/user/${userId}`;

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: "4em",
    width: "120px",
    height: "120px",
  },
}));

export const UserPage = ({ user }: { user: UserAggergation }) => {
  const classes = useStyles();

  const usernameTitle = (
    <Box flex={1}>
      <Typography variant="h6" align="center">
        {user.user.username}
      </Typography>
    </Box>
  );

  return (
    <Page>
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar style={{ height: APP_BAR_HEIGHT }}>
            <WithAuthentication
              renderAuthenticated={(currentUser) =>
                user.user.id === currentUser.user.id ? (
                  <React.Fragment>
                    <OpenCurrentUserActionsModalButton />
                    {usernameTitle}
                    <Box p={3} />
                  </React.Fragment>
                ) : (
                  usernameTitle
                )
              }
              renderDefault={() => usernameTitle}
            />
          </Toolbar>
        </AppBar>
      </Hidden>

      <Paper>
        <Container maxWidth="md">
          <Box p={2}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              paddingBottom={1}
            >
              <AvatarUser user={user.user} className={classes.avatar} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" align="center">
                {user.user.username}
              </Typography>
            </Box>
          </Box>

          <WithAuthentication
            renderAuthenticated={(currentUser) =>
              currentUser.user.id === user.user.id && <CurrentUserActions />
            }
          />
        </Container>
      </Paper>

      <TabsAndTabPanels user={user} />
    </Page>
  );
};

export default () => {
  const { userId } = useParams<{ userId: string }>();

  const query = useQueryUsers({ id: userId });

  if (query.error) {
    return <ErrorPage />;
  }

  if (query.data === undefined) {
    return <LoadingPage />;
  }

  const users = query.data.results;

  if (users.length === 0) {
    return <EmptyPage />;
  }

  const user = users[0];

  if (!user) {
    return <EmptyPage />
  }

  return <UserPage user={user} />;
};
