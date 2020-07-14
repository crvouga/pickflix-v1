import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

export const AnimatedSwitch = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Switch location={location} key={location.pathname} {...props} />;
};

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflowY: "scroll",
  },
});

const transition = {
  duration: 0.2,
  ease: "linear",
};

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const AnimatedRoute = (props) => {
  return (
    <Route {...props} />
    // <motion.div
    //   initial="hidden"
    //   animate="visible"
    //   exit="hidden"
    //   variants={variants}
    //   onAnimationComplete={scrollToTop}
    // >
    //   <Route {...props} />
    // </motion.div>
  );
};
