import {
  Avatar,
  Container,
  Fade,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  avatar: {
    width: 80,
    height: 80,
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Fade in>
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <Avatar className={classes.avatar} />
          <Typography gutterBottom variant="h5" align="center">
            Sign in to Pickflix
          </Typography>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Paper>
      </Container>
    </Fade>
  );
};
