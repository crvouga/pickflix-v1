import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";

const getWebsiteAuthorUrl = () => {
  // return process.env.REACT_APP_WEBSITE_AUTHOR_URL;
  return "https://chrisvouga.dev/";
};

export const Footer = () => {
  return (
    <Box
      p={4}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="overline" color="textSecondary">
        Built By
      </Typography>

      <Button
        onClick={() => {
          window.open(getWebsiteAuthorUrl());
        }}
      >
        Chris Vouga
      </Button>
    </Box>
  );
};
