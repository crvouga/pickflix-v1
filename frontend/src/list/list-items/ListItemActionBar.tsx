import { Box, Chip, Zoom } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useEffect } from "react";
import useModal from "../../app/modals/useModal";
import { useListener } from "../../common/utility";
import useRemoveListItemsForm from "../forms/remove-list-items-form/useRemoveListItemsForm";

export const ListItemActionBar = ({ listId }: { listId: string }) => {
  const removeListItemsFormModal = useModal("RemoveListItemsForm");
  const {
    isSelecting,
    setListItemIds,
    listItemIds,
    setIsSelecting,
    eventEmitter,
    setListId,
  } = useRemoveListItemsForm();

  useEffect(() => {
    setListId(listId);
  }, [listId]);

  const seletectedCount = Object.values(listItemIds).length;

  useListener(eventEmitter, "submit", () => {
    setIsSelecting(false);
  });

  useListener(eventEmitter, "submitSuccess", () => {
    setListItemIds({});
  });

  return (
    <React.Fragment>
      <Chip
        clickable
        onClick={() => {
          if (isSelecting) {
            setListItemIds({});
            setIsSelecting(false);
          } else {
            setIsSelecting(true);
          }
        }}
        label={isSelecting ? "Cancel" : "Select"}
      />
      <Box flex={1}></Box>
      <Zoom in={isSelecting}>
        <Chip
          // color="primary"
          clickable
          variant={seletectedCount === 0 ? "outlined" : "default"}
          disabled={seletectedCount === 0}
          label="Remove"
          icon={<RemoveIcon />}
          onClick={() => {
            removeListItemsFormModal.open();
          }}
        />
      </Zoom>
    </React.Fragment>
  );
};

export default ({ listId }: { listId: string }) => {
  return (
    <Box width="100%" display="flex" alignItems="center" p={2}>
      <ListItemActionBar listId={listId} />
    </Box>
  );
};