import { Box, Chip, Grow, Zoom } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useEffect } from "react";
import useModal from "../../navigation/modals/useModal";
import { useListener } from "../../utils";
import useDeleteListItemsForm from "../forms/remove-list-items-form/useRemoveListItemsForm";

export const ListItemActionBar = ({ listId }: { listId: string }) => {
  const {
    isSelecting,
    setListItemIds,
    listItemIds,
    toggleIsSelecting,
    setIsSelecting,
    eventEmitter,
    setListId,
  } = useDeleteListItemsForm();

  useEffect(() => {
    setListId(listId);
  }, [listId]);

  const deleteListItemsFormModal = useModal("DeleteListItemsForm");
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
          clickable
          disabled={seletectedCount === 0}
          label="Remove"
          icon={<RemoveIcon />}
          onClick={() => {
            deleteListItemsFormModal.open();
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
