import {
  Box,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { IController } from "./useHorizontalSnapScrollController";

const HIDE_SCROLL_BARS = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollBarWidth: "none",
  "-ms-overflow-style": "none",
};

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    overflowY: "hidden",
    transform: "translateZ(0)",
    "& *": {
      flexShrink: 0,
    },

    scrollSnapType: "x mandatory",
    scrollPaddingLeft: theme.spacing(2),
    ...HIDE_SCROLL_BARS,
  },
  childWrapper: {
    scrollSnapAlign: "start",
  },
  small: {},
}));

export const HorizontalSnapScroll = ({
  children,
  controller,
}: React.PropsWithChildren<{
  controller: IController;
}>) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const {
    leftDisabled,
    scrollLeft,
    rightDisabled,
    scrollRight,
    ref,
  } = controller;

  const component = (
    <div ref={ref} className={classes.scrollContainer}>
      {React.Children.map(children, (child) => (
        <div className={classes.childWrapper}>{child}</div>
      ))}
    </div>
  );

  const canScroll = !(leftDisabled && rightDisabled);

  if (isMobile || !canScroll) {
    return component;
  }

  return (
    <Box display="flex" alignItems="center">
      <Box>
        <IconButton onClick={scrollLeft} disabled={leftDisabled}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {component}

      <Box>
        <IconButton onClick={scrollRight} disabled={rightDisabled}>
          <ArrowForwardIcon className={classes.small} />
        </IconButton>
      </Box>
    </Box>
  );
};
