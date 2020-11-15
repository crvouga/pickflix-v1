import {
  AppBar,
  Box,
  Button,
  Hidden,
  Slide,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React from "react";
import ResponsiveDialog from "../common/components/ResponsiveDialog";
import useModal from "../navigation/modals/useModal";
import ListLists from "../users/ListLists";
import { UserAggergation } from "../users/query";
import useAddListForm from "./hooks/useAddListForm";
import useAddListItemForm from "./hooks/useAddListItemForm";
import { ListAggergation } from "./query/types";

const SlideUp = (props: TransitionProps) => {
  return <Slide direction="up" {...props} />;
};

export default ({ currentUser }: { currentUser: UserAggergation }) => {
  const addListItemModal = useModal("AddListItem");
  const addListItemForm = useAddListItemForm();

  const addListModal = useModal("AddList");
  const addListForm = useAddListForm();

  const handleClose = () => {
    addListItemForm.reset();
    addListItemModal.close();
  };

  const handleClickCreate = () => {
    addListForm.setItemInfos(addListItemForm.itemInfos);
    handleClose();
    addListModal.open();
  };

  const handleClick = async (list: ListAggergation) => {
    const tmdbMedia = addListItemForm.itemInfos[0];

    if (tmdbMedia) {
      await addListItemForm.submit({
        mediaId: {
          tmdbMediaId: Number(tmdbMedia.tmdbMediaId),
          tmdbMediaType: tmdbMedia.tmdbMediaType,
        },
        listId: list.list.id,
      });
      handleClose();
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
        <Button
          onClick={handleClickCreate}
          size="large"
          fullWidth
          startIcon={<PlaylistAddIcon />}
        >
          Create New
        </Button>
      </Box>

      <Box p={1}>
        <ListLists onClick={handleClick} user={currentUser} />
      </Box>
    </ResponsiveDialog>
  );
};
