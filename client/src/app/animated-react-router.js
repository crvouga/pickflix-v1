import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

export const AnimatedSwitch = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <Route
        render={({ location }) => (
          <Switch location={location} key={location.pathname} {...props} />
        )}
      />
    </div>
  );
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

const scrollToTop = () => {
  window.scrollTo(0, 0);
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
