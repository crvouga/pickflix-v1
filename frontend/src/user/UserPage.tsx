import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import EmptyPage from "../common/page/EmptyPage";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import WithAuthentication from "./auth/WithAuthentication";
import AvatarUser from "./components/AvatarUser";
import CurrentUserActions, {
  OpenCurrentUserActionsModalButton,
} from "./CurrentUserActions";
import ListAutoLists from "./lists/ListAutoLists";
import ListLists from "./lists/ListLists";
import { useQueryUsers, UserAggergation } from "./query";
import ListReviews from "./reviews/ListReviews";

export const makeUserPageRoute = ({ userId }: { userId: string }) =>
  `/user/${userId}`;

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: "4em",
    width: "120px",
    height: "120px",
  },
}));

export const UserPage = ({
  user,
  isCurrentUser = false,
}: {
  user: UserAggergation;
  isCurrentUser?: boolean;
}) => {
  const classes = useStyles();
  const history = useHistory();

  const usernameTitle = (
    <Box flex={1}>
      <Typography variant="h6" align="center">
        {user.user.username}
      </Typography>
    </Box>
  );

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
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
              currentUser.user.id === user.user.id && (
                <CurrentUserActions currentUser={currentUser} />
              )
            }
          />
        </Container>
      </Paper>

      <Container maxWidth="md" disableGutters>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography variant="h5">Auto Lists</Typography>
              <ListAutoLists
                onClick={(autoList) => {
                  history.push(`/auto-list/${autoList.list.id}`);
                }}
                user={user}
              />
            </Box>
            <Box p={2}>
              <Typography variant="h5">Lists</Typography>
              <ListLists
                onClick={(list) => {
                  history.push(`/list/${list.list.id}`);
                }}
                user={user}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography variant="h5">Reviews</Typography>
              <ListReviews user={user} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
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

  return <UserPage user={user} />;
};
