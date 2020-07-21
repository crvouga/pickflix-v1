import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default () => (
  <AppBar position="sticky" color="secondary" style={{ color: "white" }}>
    <Toolbar variant="dense">
      <Typography
        color="textPrimary"
        align="center"
        style={{ fontWeight: "bold", flex: 1 }}
      >
        Sign In Here! It's Super Easy!
      </Typography>

      <Button variant="contained" color="primary" style={{ color: "white" }}>
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
);
