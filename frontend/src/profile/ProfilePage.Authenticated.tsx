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
  Button,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import AvatarUser from "../auth/AvatarUser";
import { User } from "../auth/query";
import LabeledIconButton from "../common/components/LabeledIconButton";
import useBoolean from "../common/hooks/useBoolean";
import UserListsList from "../lists/UserListsList";
import useModal from "../navigation/modals/useModal";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import UserReviewsList from "../reviews/UserReviewsList";
import OptionsDialog from "./OptionsDialog";
import { ListAggergation } from "../lists/query/types";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: "4em",
    width: "120px",
    height: "120px",
  },
}));

export default ({ currentUser }: { currentUser: User }) => {
  const classes = useStyles();
  const history = useHistory();
  const isDialogOpen = useBoolean(false);
  const addListModal = useModal("AddList");
  const reviewModal = useModal("ReviewForm");

  const handleClickList = (list: ListAggergation) => {
    history.push(`/list/${list.list.id}`);
  };

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
            <IconButton onClick={isDialogOpen.setTrue}>
              <SettingsIcon />
            </IconButton>
            <Box flex={1}>
              <Typography variant="h6" align="center">
                {currentUser.username}
              </Typography>
            </Box>
            <IconButton disabled>
              <SettingsIcon style={{ opacity: 0 }} />
            </IconButton>
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
              <AvatarUser user={currentUser} className={classes.avatar} />
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="h4" align="center">
                {currentUser.username}
              </Typography>
              <Hidden xsDown>
                <IconButton onClick={isDialogOpen.setTrue}>
                  <SettingsIcon />
                </IconButton>
              </Hidden>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography variant="h5">Lists</Typography>
              <Button
                fullWidth
                size="large"
                onClick={addListModal.open}
                startIcon={<PlaylistAddIcon />}
                variant="outlined"
              >
                Create List
              </Button>
              <UserListsList
                onClick={handleClickList}
                username={currentUser.username}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography variant="h5">Reviews</Typography>
              <Button
                fullWidth
                size="large"
                onClick={reviewModal.open}
                startIcon={<RateReviewOutlinedIcon />}
                variant="outlined"
              >
                Write Review
              </Button>
              <UserReviewsList username={currentUser.username} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
