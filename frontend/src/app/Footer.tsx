// import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";

// const getWebsiteAuthorUrl = () => {
//   return "https://chrisvouga.dev/";
// };

export const Footer = () => {
  return (
    <Box
      p={4}
      paddingBottom={2}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* <Link
        onClick={() => {
          window.open(getWebsiteAuthorUrl());
        }}
      >
        Chris Vouga
      </Link> */}
    </Box>
  );
};
