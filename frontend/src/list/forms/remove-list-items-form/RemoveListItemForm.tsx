import { Button, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { pluralize, useListener } from "../../../common/utility";
import useDeleteListItemsForm from "./useRemoveListItemsForm";

export default ({ onCancel }: { onCancel?: () => void }) => {
  const { submit, eventEmitter, listItemIds } = useDeleteListItemsForm();
  const snackbar = useSnackbar();
  const selectedCount = Object.values(listItemIds).length;

  const title = `Remove ${pluralize(selectedCount, "item")}?`;

  useListener(eventEmitter, "submitSuccess", () => {
    snackbar.display({
      message: `Removed ${pluralize(selectedCount, "item")}`,
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
    </React.Fragment>
  );
};
