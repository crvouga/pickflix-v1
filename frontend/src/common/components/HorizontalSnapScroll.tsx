import { Box, BoxProps, Fab, makeStyles, Grow } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useRef, useEffect, useState } from "react";
import useBoolean from "../hooks/useBoolean";

const ICON_BUTTON_HEIGHT = "24px";

const useStyles = makeStyles((theme) => ({
  root: {
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
  },
  childWrapper: {
    scrollSnapAlign: "start",
  },
  backButton: {
    zIndex: 3,
    position: "absolute",
    top: `calc(50% - ${ICON_BUTTON_HEIGHT})`,
    left: theme.spacing(2),
  },
  forwardButton: {
    zIndex: 3,
    position: "absolute",
    top: `calc(50% - ${ICON_BUTTON_HEIGHT})`,
    right: theme.spacing(2),
  },
}));

export default ({ children, ...props }: BoxProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(true);

  const updatedDisabled = () => {
    if (ref.current) {
      setLeftDisabled(ref.current.scrollLeft === 0);

      setRightDisabled(
        ref.current.scrollWidth === ref.current.getBoundingClientRect().width
      );
    }
  };

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scroll({
        left: Math.max(
          0,
          ref.current.scrollLeft - ref.current.getBoundingClientRect().width
        ),
        behavior: "smooth",
      });
      updatedDisabled();
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scroll({
        left:
          ref.current.scrollLeft + ref.current.getBoundingClientRect().width,
        behavior: "smooth",
      });
      updatedDisabled();
    }
  };

  useEffect(() => {
    updatedDisabled();
  }, [ref.current]);

  return (
    <Box position="relative" {...props}>
      <Fab
        disabled={leftDisabled}
        size="small"
        className={classes.backButton}
        onClick={scrollLeft}
      >
        <ArrowBackIcon />
      </Fab>

      <div ref={ref} className={classes.root}>
        {React.Children.map(children, (child) => (
          <Box className={classes.childWrapper}>{child}</Box>
        ))}
      </div>
      <Fab
        disabled={rightDisabled}
        size="small"
        className={classes.forwardButton}
        onClick={scrollRight}
      >
        <ArrowForwardIcon />
      </Fab>
    </Box>
  );
};
