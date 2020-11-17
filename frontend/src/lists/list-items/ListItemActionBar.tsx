import { Box, Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import useModal from "../../navigation/modals/useModal";
import { useListener } from "../../utils";
import useDeleteListItemsForm from "../forms/remove-list-items-form/useRemoveListItemsForm";

export default ({ listId }: { listId: string }) => {
  const {
    isSelecting,
    setListItemIds,
    listItemIds,
    setIsSelecting,
    eventEmitter,
  } = useDeleteListItemsForm();

  const deleteListItemsFormModal = useModal("DeleteListItemsForm");
  const seletectedCount = Object.values(listItemIds).length;

  useListener(eventEmitter, "submitSuccess", () => {
    setIsSelecting(false);
    setListItemIds({});
  });

  if (isSelecting) {
    return (
      <Box width="100%" display="flex" alignItems="center" p={1}>
        <Chip
          clickable
          onClick={() => {
            setListItemIds({});
            setIsSelecting(false);
          }}
          label="Cancel"
        />
        <Box flex={1}></Box>
        <Chip
          clickable
          disabled={seletectedCount === 0}
          label="Remove"
          icon={<RemoveIcon />}
          onClick={() => {
            deleteListItemsFormModal.open();
          }}
        />
      </Box>
    );
  }

  return (
    <Box width="100%" display="flex" alignItems="center" p={1}>
      <Chip
        clickable
        onClick={() => {
          setIsSelecting(true);
        }}
        label="Select"
      />
    </Box>
  );
};
