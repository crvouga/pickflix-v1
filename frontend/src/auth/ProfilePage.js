import {
  Avatar,
  Container,
  Fade,
  makeStyles,
  Paper,
  Typography,
  List,
  Button,
} from "@material-ui/core";
import firebase from "firebase";
import React from "react";

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
  const { user = {} } = {};
  return (
    <Fade in>
      <Container maxWidth="xs">
        <Paper className={classes.root}>
          <Avatar className={classes.avatar} src={user.photoURL} />
          <Typography>{user.displayName}</Typography>
          <Typography>{user.email}</Typography>
          <Button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </Button>
        </Paper>
      </Container>
    </Fade>
  );
};
