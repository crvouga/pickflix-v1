import { AppBar, Box, Button, Hidden, Typography } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React from "react";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import { SlideUp } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import ListLists from "../../../users/ListLists";
import { UserAggergation } from "../../../users/query";
import useCreateListForm from "../create-list-form/useCreateListForm";
import useAddListItemForm from "./useAddListItemForm";
import { ListAggergation } from "../../query";
import { useListener } from "../../../utils";
import useSnackbar from "../../../snackbar/useSnackbar";
import { ViewListButton } from "../../../snackbar/Snackbar";

const CreateNewListButton = () => {
  const createListFormModal = useModal("CreateListForm");
  const createListForm = useCreateListForm();
  const addListItemForm = useAddListItemForm();
  const handleClickCreateList = () => {
    if (addListItemForm.mediaId) {
      createListForm.setMediaIds([addListItemForm.mediaId]);
    }
    createListFormModal.open();
  };

  return (
    <Button
      onClick={handleClickCreateList}
      size="large"
      fullWidth
      startIcon={<PlaylistAddIcon />}
    >
      Create New
    </Button>
  );
};

export default ({ currentUser }: { currentUser: UserAggergation }) => {
  const addListItemModal = useModal("AddListItemForm");
  const addListItemForm = useAddListItemForm();
  const snackbar = useSnackbar();

  const handleClose = () => {
    addListItemModal.close();
  };

  useListener(addListItemForm.eventEmitter, "submitSuccess", (list) => {
    snackbar.display({
      message: `Added to "${list.title}"`,
      action: <ViewListButton listId={list.id} />,
    });
    addListItemModal.close();
  });

  const handleClickList = (list: ListAggergation) => {
    if (addListItemForm.mediaId) {
      addListItemForm.submit({
        list: list.list,
        mediaId: addListItemForm.mediaId,
      });
    }
  };

  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={addListItemModal.isOpen}
      onClose={handleClose}
    >
      <AppBar color="default" position="sticky">
        <Box display="flex" padding={2} alignItems="center">
          <Box flex={1}>
            <Typography variant="h6">Add to list</Typography>
          </Box>
          <Hidden smUp>
            <Button onClick={handleClose} size="large">
              Cancel
            </Button>
          </Hidden>
        </Box>
      </AppBar>

      <Box p={1}>
        <CreateNewListButton />
      </Box>

      <Box p={1}>
        <ListLists onClick={handleClickList} user={currentUser} />
      </Box>
    </ResponsiveDialog>
  );
};
