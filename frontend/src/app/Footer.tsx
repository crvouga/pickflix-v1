import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import React from "react";

export const Footer = () => {
  return (
    <Box p={2} display="flex" justifyContent="center" alignItems="center">
      <Link
        href="https://chrisvouga.dev/"
        underline="none"
        variant="h6"
        color="textSecondary"
        align="center"
      >
        Made by Chris Vouga
      </Link>
    </Box>
  );
};
