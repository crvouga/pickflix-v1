import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import { SlideUp } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import ToggleListItemForm from "./ToggleListItemForm";

export default () => {
  const { isOpen, close } = useModal("ToggleListItemForm");

  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={isOpen}
      onClose={close}
    >
      <Box marginBottom={8}>
        <ToggleListItemForm />
      </Box>
      <Hidden smUp>
        <Box position="fixed" bottom={0} width="100%">
          <Paper>
            <List>
              <ListItem button onClick={close}>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: "h6" }}
                  primary="Done"
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Hidden>
    </ResponsiveDialog>
  );
};
