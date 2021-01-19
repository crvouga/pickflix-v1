import {
  Box,
  Fab,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useEffect, useRef, useState } from "react";

const HIDE_SCROLL_BARS = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollBarWidth: "none",
  "-ms-overflow-style": "none",
};

const useStyles = makeStyles(() => ({
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

    ...HIDE_SCROLL_BARS,
  },
  childWrapper: {
    scrollSnapAlign: "start",
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
        ref.current.scrollWidth <= ref.current.getBoundingClientRect().width
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
        <Fab size="small" onClick={scrollLeft} disabled={leftDisabled}>
          <ArrowBackIcon />
        </Fab>
      </Box>

      {component}

      <Box>
        <Fab size="small" onClick={scrollRight} disabled={rightDisabled}>
          <ArrowForwardIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default (props: React.PropsWithChildren<{}>) => {
  const controller = useHorizontalSnapScrollController();
  return <HorizontalSnapScroll controller={controller} {...props} />;
};
