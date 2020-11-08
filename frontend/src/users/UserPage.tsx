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
import { ListAggergation } from "../lists/query/types";
import useModal from "../navigation/modals/useModal";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import AvatarUser from "./AvatarUser";
import OptionsDialog from "./OptionsDialog";
import { getUser, queryKeys } from "./query";
import useCurrentUser from "./useCurrentUser";
import UserListsList from "./UserListsList";
import UserReviewsList from "./UserReviewsList";

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
  const addListModal = useModal("AddList");
  const reviewModal = useModal("ReviewForm");
  const currentUser = useCurrentUser();
  const query = useQuery(queryKeys.user({ username }), () =>
    getUser({ username })
  );

  const handleClickList = (list: ListAggergation) => {
    history.push(`/list/${list.list.id}`);
  };

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data || currentUser === "loading") {
    return <LoadingPage />;
  }

  const user = query.data;
  const isCurrentUser = currentUser !== null && user.id === currentUser.id;

  return (
    <React.Fragment>
      <OptionsDialog
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      />

      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <Box flex={1}>
              <Typography variant="h6" align="center">
                {user.username}
              </Typography>
            </Box>
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
              <AvatarUser user={user} className={classes.avatar} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" align="center">
                {user.username}
              </Typography>
            </Box>
          </Box>
          {isCurrentUser && (
            <Toolbar>
              <IconButton onClick={isDialogOpen.setTrue}>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={addListModal.open}>
                <PlaylistAddIcon />
              </IconButton>
              <IconButton onClick={reviewModal.open}>
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
              <Typography variant="h5">Lists</Typography>
              <UserListsList user={user} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography variant="h5">Reviews</Typography>
              <UserReviewsList user={user} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
