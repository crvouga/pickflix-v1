import { CircularProgress, makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import React from "react";
import AspectRatio from "../../common/AspectRatio";

const backgroundFade = (theme) => {
  const color = theme.palette.background.default;
  return `linear-gradient(
    ${fade(color, 0)},
    ${fade(color, 1)}
  )`;
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "black",

    width: "100%",
  },

  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    color: theme.palette.text.secondary,
  },

  body: {
    textAlign: "center",
    paddingTop: theme.spacing(8),
  },

  fade: {
    pointerEvents: "none",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: backgroundFade(theme),
    width: "100%",
    height: theme.spacing(8),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AspectRatio ratio={[16, 9]} className={classes.header}>
        <div className={classes.center}>
          <CircularProgress
            className={classes.spinner}
            disableShrink
            size="2em"
          />
        </div>
        <div className={classes.fade} />
      </AspectRatio>

      <div className={classes.body}>
        <CircularProgress
          className={classes.spinner}
          disableShrink
          size="2em"
        />
      </div>
    </React.Fragment>
  );
};
