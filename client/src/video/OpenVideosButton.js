import { Box, ButtonBase, makeStyles, Typography } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import clsx from "clsx";
import * as R from "ramda";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    width: "100%",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
}));

const renderNameNumberPair = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

const renderText = (videos) =>
  videos.length === 0
    ? "No Videos"
    : R.pipe(
        R.countBy(R.prop("type")),
        R.toPairs,
        R.map(renderNameNumberPair),
        R.intersperse(" • ")
      )(videos);

export default ({ videos, ...props }) => {
  const classes = useStyles();
  const disabled = videos.length === 0 || false;

  return (
    <ButtonBase
      component="div"
      className={clsx(classes.root, {
        [classes.disabled]: disabled,
      })}
      disabled={disabled}
      {...props}
    >
      <VideoLibraryIcon className={classes.icon} />
      <Typography noWrap style={{ flex: 1 }}>
        {renderText(videos)}
      </Typography>
      <Box color="text.secondary">
        <UnfoldMoreIcon color="inherit" fontSize="small" />
      </Box>
    </ButtonBase>
  );
};
