import {
  AppBar,
  Box,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import AvatarUser from "../auth/AvatarUser";
import { User } from "../auth/query";
import LabeledIconButton from "../common/components/LabeledIconButton";
import useBoolean from "../common/hooks/useBoolean";
import ListList from "../lists/ListList";
import BackButton from "../navigation/BackButton";
import useModal from "../navigation/modals/useModal";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import OptionsDialog from "./OptionsDialog";

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: "4em",
    width: "120px",
    height: "120px",
  },
}));

export default ({ currentUser }: { currentUser: User }) => {
  const classes = useStyles();

  const isDialogOpen = useBoolean(false);
  const addListModal = useModal("AddList");
  const reviewModal = useModal("ReviewForm");

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

      <Container maxWidth="md" disableGutters>
        <Box display="flex" paddingY={2}>
          <LabeledIconButton
            onClick={addListModal.open}
            icon={<PlaylistAddIcon />}
            label="Create List"
          />
          <LabeledIconButton
            onClick={reviewModal.open}
            icon={<RateReviewOutlinedIcon />}
            label="Write Review"
          />
          {/* <LabeledIconButton icon={<GroupOutlinedIcon />} label="Watch With" /> */}
        </Box>
        <List>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary="Lists"
            />
          </ListItem>
          <ListList />
        </List>
      </Container>
    </React.Fragment>
  );
};
