import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "80vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  button: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <div className={classes.root}>
        <Box paddingBottom={2}>
          <Typography variant="h5">Couldn't find page</Typography>
        </Box>

        <Box display="flex">
          <Box marginRight={2}>
            <Button
              className={classes.button}
              onClick={() => {
                history.push("/");
              }}
              color="primary"
              variant="contained"
            >
              Go to Home Page
            </Button>
          </Box>
          <Button
            className={classes.button}
            onClick={() => {
              history.goBack();
            }}
            color="primary"
            variant="contained"
          >
            Go Back
          </Button>
        </Box>
      </div>
    </React.Fragment>
  );
};
