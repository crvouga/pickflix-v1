import { makeStyles } from "@material-ui/core";
import React from "react";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
  },
});

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default (props) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      {...props}
    />
  );
};
