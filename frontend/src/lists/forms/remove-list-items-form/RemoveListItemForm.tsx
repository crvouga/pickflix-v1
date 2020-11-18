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
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import React from "react";
import useBoolean from "../../../common/hooks/useBoolean";
import { pluralize, useListener } from "../../../utils";
import useDeleteListItemsForm from "./useRemoveListItemsForm";
import { useSnackbar } from "../../../snackbar/redux/snackbar";

const LoadingDialog = () => {
  const { eventEmitter } = useDeleteListItemsForm();
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
          <ListItemText primary="Removing" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const { submit, eventEmitter, listItemIds } = useDeleteListItemsForm();
  const snackbar = useSnackbar();
  const selectedCount = Object.values(listItemIds).length;

  const title = `Remove ${pluralize(selectedCount, "item")}?`;

  useListener(eventEmitter, "submitSuccess", () => {
    snackbar.display({
      message: `Deleted ${pluralize(selectedCount, "item")}`,
    });
  });

  return (
    <React.Fragment>
      <DialogTitle>{title}</DialogTitle>

      <DialogActions>
        {onCancel && (
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          size="large"
          onClick={() => {
            submit();
          }}
        >
          Remove
        </Button>
      </DialogActions>

      {/* <LoadingDialog /> */}
    </React.Fragment>
  );
};
