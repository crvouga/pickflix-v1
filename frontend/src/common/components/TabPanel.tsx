import { Box } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const TabPanelContainer = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export const TabPanel = (props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) => {
  const { children, value, index } = props;
  const tabVariants = {
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
  return (
    <Box hidden={value !== index} minHeight="360px">
      {value === index && (
        <motion.div
          variants={tabVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          {children}
        </motion.div>
      )}
    </Box>
  );
};
