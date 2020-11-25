import {
  CircularProgress,
  Dialog,
  DialogProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
} from "@material-ui/core";
import React from "react";

export default ({
  ListItemTextProps,
  ...props
}: { ListItemTextProps?: ListItemTextProps } & DialogProps) => {
  return (
    <Dialog {...props}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CircularProgress disableShrink />
          </ListItemIcon>
          <ListItemText {...ListItemTextProps} />
        </ListItem>
      </List>
    </Dialog>
  );
};
