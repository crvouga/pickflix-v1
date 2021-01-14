import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import PickflixLogo from "../../common/PickflixLogo";
import { makeCurrentUserPageRoute } from "../../user/CurrentUserPage";
import useModal from "../modals/useModal";
import { APP_BAR_HEIGHT } from "./constants";
import { DiscoverPageIcon, HomePageIcon, ProfilePageIcon } from "./PageIcons";
import { SearchBox } from "./Search";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
    width: "100%",
    maxWidth: theme.breakpoints.values["lg"],
    height: APP_BAR_HEIGHT,
  },
  appBar: {
    display: "flex",
    alignItems: "center",
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const searchModal = useModal("Search");

  const handleClickLogo = () => {
    history.push("/");
  };

  const handleClickSearch = () => {
    searchModal.open();
  };

  const handleClickProfile = () => {
    history.push(makeCurrentUserPageRoute());
  };

  const handleClickDiscover = () => {
    history.push("/discover");
  };

  const hanldeClickHome = () => {
    history.push("/home");
  };

  return (
    <AppBar color="default" position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <PickflixLogo onClick={handleClickLogo} />
        <SearchBox onClick={handleClickSearch} />
        <Box display="flex">
          <IconButton onClick={hanldeClickHome}>
            <HomePageIcon />
          </IconButton>
          <IconButton onClick={handleClickDiscover}>
            <DiscoverPageIcon />
          </IconButton>
          <IconButton onClick={handleClickProfile}>
            <ProfilePageIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
