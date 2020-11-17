import {
  AppBar,
  Box,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import PickflixLogo from "../common/PickflixLogo";
import useModal from "./modals/useModal";
import { DiscoverPageIcon, HomePageIcon, ProfilePageIcon } from "./PageIcons";
import { SearchBox } from "./Search";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
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
    history.push("/user");
  };

  const handleClickDiscover = () => {
    history.push("/discover");
  };

  const hanldeClickHome = () => {
    history.push("/");
  };

  return (
    <AppBar color="default" position="sticky">
      <Container maxWidth="lg">
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
      </Container>
    </AppBar>
  );
};
