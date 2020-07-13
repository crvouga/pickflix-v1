import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

export const AnimatedSwitch = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter={true} initial={false}>
            <Switch location={location} key={location.pathname} {...props} />
          </AnimatePresence>
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

const variants = {
  hidden: {
    opacity: 0,
    duration: 0.3,
  },
  visible: {
    opacity: 1,
    duration: 0.3,
  },
};

export const AnimatedRoute = (props) => {
  const classes = useStyles();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      <Route {...props} />
    </motion.div>
  );
};
