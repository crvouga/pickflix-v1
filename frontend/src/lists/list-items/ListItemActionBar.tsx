import { Box, Chip } from "@material-ui/core";
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
    setIsSelecting,
    eventEmitter,
    setListId,
  } = useDeleteListItemsForm();

  useEffect(() => {
    setListId(listId);
  }, [listId]);

  const deleteListItemsFormModal = useModal("DeleteListItemsForm");
  const seletectedCount = Object.values(listItemIds).length;

  useListener(eventEmitter, "submitSuccess", () => {
    setIsSelecting(false);
    setListItemIds({});
  });

  if (isSelecting) {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Chip
        clickable
        onClick={() => {
          setIsSelecting(true);
        }}
        label="Select"
      />
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
