import { Button, makeStyles, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";
import ResponsiveNavigation from "../../navigation/ResponsiveNavigation";

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
}));

export default () => {
  const classes = useStyles();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <div className={classes.root}>
        <Typography variant="h6">Something went wrong</Typography>
        <Typography gutterBottom color="textSecondary">
          Try refreshing the page or pressing the back button
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          color="primary"
          variant="contained"
        >
          Try again
        </Button>
      </div>
    </React.Fragment>
  );
};
