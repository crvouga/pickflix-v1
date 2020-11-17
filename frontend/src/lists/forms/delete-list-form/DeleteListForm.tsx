import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../utils";
import useDeleteListForm from "./useDeleteListForm";

const LoadingDialog = () => {
  const { submit, eventEmitter } = useDeleteListForm();
  const isLoading = useBoolean(false);
  useListener(eventEmitter, "submit", isLoading.setTrue);
  useListener(eventEmitter, "submitSettled", isLoading.setFalse);
  return (
    <Dialog open={isLoading.value}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CircularProgress disableShrink />
          </ListItemIcon>
          <ListItemText primary="Deleting" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const { submit, eventEmitter } = useDeleteListForm();
  const history = useHistory();

  useListener(eventEmitter, "submitSuccess", () => {
    history.push("/user");
  });

  return (
    <React.Fragment>
      <LoadingDialog />
      <Box p={2}>
        <Typography>Delete list?</Typography>
      </Box>
      <Box p={2} paddingTop={0} display="flex" flexDirection="row-reverse">
        <Button onClick={submit}>Delete</Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </Box>
    </React.Fragment>
  );
};
