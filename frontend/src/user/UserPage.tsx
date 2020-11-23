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
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import WithAuthentication from "./auth/WithAuthentication";
import AvatarUser from "./components/AvatarUser";
import CurrentUserActions, {
  OpenCurrentUserActionsModalButton,
} from "./CurrentUserActions";
import ListAutoLists from "./lists/ListAutoLists";
import ListLists from "./lists/ListLists";
import { getUser, queryKeys } from "./query";
import ListReviews from "./reviews/ListReviews";

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: "4em",
    width: "120px",
    height: "120px",
  },
}));

export default () => {
  const { username } = useParams<{ username: string }>();
  const classes = useStyles();
  const history = useHistory();

  const query = useQuery(queryKeys.user({ username }), () =>
    getUser({ username })
  );

  if (query.error) {
    return <ErrorPage />;
  }

  if (query.data === undefined) {
    return <LoadingPage />;
  }

  const user = query.data;

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <WithAuthentication
              renderAuthenticated={(currentUser) =>
                currentUser.user.id === user.user.id && (
                  <OpenCurrentUserActionsModalButton />
                )
              }
              renderUnathenticated={() => <Box p={3} />}
            />
            <Box flex={1}>
              <Typography variant="h6" align="center">
                {user.user.username}
              </Typography>
            </Box>
            <Box p={3} />
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
