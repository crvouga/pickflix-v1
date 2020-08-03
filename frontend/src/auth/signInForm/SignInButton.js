import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React from "react";

export default ({ icon, text, ...props }) => (
  <Box marginBottom={2} component={Paper} variant="outlined" {...props}>
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ style: { fontWeight: "bold" } }}
        primary={text}
      />
    </ListItem>
  </Box>
);
