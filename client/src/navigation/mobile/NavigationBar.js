import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router";
import HideOnScroll from "../../common/HideOnScroll";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default ({ title, ...props }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleArrowBackClick = () => {
    history.goBack();
  };

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        className={classes.appBar}
        color="default"
        {...props}
      >
        <Toolbar variant="dense" style={{ width: "100%" }}>
          <IconButton edge="start" onClick={handleArrowBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            align="center"
            noWrap
            style={{ flex: 1, fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <IconButton edge="end" style={{ visibility: "hidden" }}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};
