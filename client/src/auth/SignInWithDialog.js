import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EmailIcon from "@material-ui/icons/Email";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import {
  createButton,
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const PickflixButton = createButton({
  icon: () => <MovieIcon />,
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "#303030" },
  activeStyle: { background: "#202020" },
});

const EmailLoginButton = createButton({
  text: "Login with email",
  icon: () => <EmailIcon />,
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "gray" },
  activeStyle: { background: "gray" },
});

const SignInOptions = () => {
  return (
    <React.Fragment>
      <PickflixButton>Continue with Pickflix</PickflixButton>
      <TwitterLoginButton>Continue with Twitter</TwitterLoginButton>
      <GoogleLoginButton>Continue with Google</GoogleLoginButton>
      <FacebookLoginButton>Continue with Facebook</FacebookLoginButton>
    </React.Fragment>
  );
};

export default () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog fullScreen={fullScreen} open={false}>
      {fullScreen && (
        <AppBar
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          color="transparent"
          position="sticky"
        >
          <Toolbar>
            <IconButton edge="start">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <DialogContent>
        <Typography variant="h6" align="center">
          Who do you want to sign in with?
        </Typography>
        <SignInOptions />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
