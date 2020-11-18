import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import useModal from "../navigation/modals/useModal";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import useReviewForm from "../reviews/form/review-form/useReviewForm";
import AvatarUser from "./components/AvatarUser";
import ListAutoLists from "./lists/ListAutoLists";
import ListLists from "./lists/ListLists";
import ListReviews from "./reviews/ListReviews";
import { getUser, queryKeys } from "./query";
import { useQueryCurrentUser } from "./query/hooks";
import UserOptionsListModal from "./UserOptionsListModal";

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
  const isDialogOpen = useBoolean(false);
  const createListFormModal = useModal("CreateListForm");
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm();
  const queryCurrentUser = useQueryCurrentUser();
  const query = useQuery(queryKeys.user({ username }), () =>
    getUser({ username })
  );

  const handleClickReview = () => {
    reviewForm.setReview({});
    reviewFormModal.open();
  };

  if (query.error || queryCurrentUser.error) {
    return <ErrorPage />;
  }

  if (query.data === undefined || queryCurrentUser.data === undefined) {
    return <LoadingPage />;
  }

  const user = query.data;
  const currentUser = queryCurrentUser.data;
  const isCurrentUser =
    currentUser !== null && user.user.id === currentUser.user.id;

  return (
    <React.Fragment>
      <UserOptionsListModal
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      />

      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <IconButton onClick={isDialogOpen.setTrue}>
              <SettingsIcon />
            </IconButton>
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
          {isCurrentUser && (
            <Toolbar disableGutters>
              <IconButton onClick={isDialogOpen.setTrue}>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={createListFormModal.open}>
                <PlaylistAddIcon />
              </IconButton>
              <IconButton onClick={handleClickReview}>
                <RateReviewOutlinedIcon />
              </IconButton>
            </Toolbar>
          )}
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
