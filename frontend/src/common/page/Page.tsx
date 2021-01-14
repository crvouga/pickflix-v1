import React from "react";
import { motion } from "framer-motion";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";

type PageProps = React.PropsWithChildren<{}>;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export default ({ children }: PageProps) => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </React.Fragment>
  );
};
