import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Page from "./Page";

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

export default ({
  title = "Could not find page",
  subtitle = "",
}: {
  title?: string;
  subtitle?: string;
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page>
      <div className={classes.root}>
        <Box paddingBottom={2}>
          <Typography align="center" variant="h5">
            {title}
          </Typography>
          <Typography align="center" color="textSecondary" variant="subtitle1">
            {subtitle}
          </Typography>
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
    </Page>
  );
};
