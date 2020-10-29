import {
  AppBar,
  AppBarProps,
  Box,
  Hidden,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { useCurrentUser } from "../auth/useAuth";
import PickflixLogo from "../common/PickflixLogo";
import useModal from "./modals/useModal";
import { SearchBox, SearchButton } from "./Search";
import { AvatarButtonCurrentUser } from "./User";

export const APP_BAR_HEIGHT = "56px";

const useNavBarHandlers = () => {
  const history = useHistory();
  const searchModal = useModal("Search");
  const accountModal = useModal("Account");
  const currentUser = useCurrentUser();
  return {
    handleClickLogo: () => {
      history.push("/");
    },
    handleClickSearch: () => {
      searchModal.open();
    },
    handleClickAvatarCurrentUser: () => {
      switch (currentUser) {
        case "loading":
          return;
        case null:
          return history.push("/auth");
        default:
          return accountModal.open();
      }
    },
  };
};

const Mobile = (props: AppBarProps) => {
  const {
    handleClickLogo,
    handleClickSearch,
    handleClickAvatarCurrentUser,
  } = useNavBarHandlers();
  return (
    <AppBar color="default" position="sticky" {...props}>
      <Toolbar>
        <PickflixLogo onClick={handleClickLogo} />
        <Box flex={1}></Box>
        <SearchButton onClick={handleClickSearch} />
        <AvatarButtonCurrentUser
          size="small"
          onClick={handleClickAvatarCurrentUser}
        />
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
  },
}));

const Desktop = (props: AppBarProps) => {
  const classes = useStyles();
  const {
    handleClickLogo,
    handleClickSearch,
    handleClickAvatarCurrentUser,
  } = useNavBarHandlers();

  return (
    <AppBar color="default" position="sticky" {...props}>
      <Toolbar className={classes.toolbar}>
        <PickflixLogo onClick={handleClickLogo} />
        <SearchBox onClick={handleClickSearch} />
        <AvatarButtonCurrentUser
          size="large"
          onClick={handleClickAvatarCurrentUser}
        />
      </Toolbar>
    </AppBar>
  );
};

export default () => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <Mobile />
      </Hidden>
      <Hidden xsDown>
        <Desktop />
      </Hidden>
    </React.Fragment>
  );
};
