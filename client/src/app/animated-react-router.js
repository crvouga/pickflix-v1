import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

export const AnimatedSwitch = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <Route
        render={({ location }) => (
          <AnimatePresence initial={false}>
            <Switch location={location} key={location.pathname} {...props} />
          </AnimatePresence>
        )}
      />
    </div>
  );
};

const variant = {
  in: {
    x: 0,
  },
  initial: {
    x: "100%",
  },
  out: {
    x: "-100%",
  },
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

export const AnimatedRoute = (props) => {
  const classes = useStyles();
  return (
    <motion.div
      className={classes.root}
      variants={variant}
      initial="initial"
      animate="in"
      exit="out"
    >
      <Route {...props} />
    </motion.div>
  );
};
