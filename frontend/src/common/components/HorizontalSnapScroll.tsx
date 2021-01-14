import {
  Box,
  Fab,
  Grow,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useEffect, useRef, useState } from "react";

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
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollBarWidth: "none",
    "-ms-overflow-style": "none",
  },
  childWrapper: {
    scrollSnapAlign: "start",
  },
  backButton: {
    fontWeight: "bolder",
    zIndex: 3,
    position: "absolute",
    top: `calc(50% - ${ICON_BUTTON_HEIGHT})`,
    left: theme.spacing(2),
  },
  forwardButton: {
    fontWeight: "bolder",
    zIndex: 3,
    position: "absolute",
    top: `calc(50% - ${ICON_BUTTON_HEIGHT})`,
    right: theme.spacing(2),
  },
}));

interface IController {
  scrollLeft: () => void;
  scrollRight: () => void;
  leftDisabled: boolean;
  rightDisabled: boolean;
  reset: () => void;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export const useHorizontalSnapScrollController = (): IController => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(true);

  const theme = useTheme();

  const updatedDisabled = (nextLeft: number) => {
    if (ref.current) {
      setLeftDisabled(nextLeft === 0);

      setRightDisabled(
        ref.current.scrollWidth === ref.current.getBoundingClientRect().width
      );
    }
  };

  const scrollLeft = () => {
    if (ref.current) {
      const left = Math.max(
        0,
        ref.current.scrollLeft -
          (ref.current.getBoundingClientRect().width + theme.spacing(2))
      );

      ref.current.scroll({
        left,
        behavior: "smooth",
      });

      updatedDisabled(left);
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      const left =
        ref.current.scrollLeft +
        ref.current.getBoundingClientRect().width +
        theme.spacing(2);
      ref.current.scroll({
        left,

        behavior: "smooth",
      });
      updatedDisabled(left);
    }
  };

  useEffect(() => {
    updatedDisabled(0);
  }, []);

  const reset = () => {
    if (ref.current) {
      const left = 0;
      ref.current.scroll({
        left,
        behavior: "smooth",
      });
      updatedDisabled(left);
    }
  };

  return {
    reset,
    scrollRight,
    scrollLeft,
    leftDisabled,
    rightDisabled,
    ref,
  };
};

export const HorizontalSnapScroll = ({
  children,
  controller,
}: React.PropsWithChildren<{
  controller: IController;
}>) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    leftDisabled,
    scrollLeft,
    rightDisabled,
    scrollRight,
    ref,
  } = controller;
  return (
    <Box position="relative">
      <Grow in={!leftDisabled && !isMobile}>
        <Fab size="small" className={classes.backButton} onClick={scrollLeft}>
          <ArrowBackIcon />
        </Fab>
      </Grow>

      <div ref={ref} className={classes.root}>
        {React.Children.map(children, (child) => (
          <Box className={classes.childWrapper}>{child}</Box>
        ))}
      </div>
      <Grow in={!rightDisabled && !isMobile}>
        <Fab
          disabled={rightDisabled}
          size="small"
          className={classes.forwardButton}
          onClick={scrollRight}
        >
          <ArrowForwardIcon />
        </Fab>
      </Grow>
    </Box>
  );
};

export default (props: React.PropsWithChildren<{}>) => {
  const controller = useHorizontalSnapScrollController();
  return <HorizontalSnapScroll controller={controller} {...props} />;
};
