import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import useModal from "../../../app/modals/useModal";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { BackendAPI } from "../../../backend-api";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import DiscoverMovieTag from "../../DiscoverMovieTag";
import { IDiscoverMovieTag } from "../../query/types";
import useDiscoverState from "../../useDiscoverState";

const postDiscoverTags = async ({
  tagsById,
}: {
  tagsById: {
    [id: string]: IDiscoverMovieTag;
  };
}) => {
  await BackendAPI.post("/api/media/tmdb/discover/tags", {
    tagsById,
  });
};

export const SaveDiscoverTagsFormModal = () => {
  const { activeTags } = useDiscoverState();
  const { isOpen, close } = useModal("SaveDiscoverTagsForm");
  const snackbar = useSnackbar();
  const isLoading = useBoolean(false);

  const handleSubmit = async () => {
    try {
      const tagsById = activeTags.reduce(
        (byId, tag) => ({
          ...byId,
          [tag.id]: tag,
        }),
        {}
      );
      isLoading.setTrue();
      close();
      await postDiscoverTags({
        tagsById,
      });
      snackbar.display({
        message: "Saved tags",
      });
    } catch (error) {
    } finally {
      isLoading.setFalse();
    }
  };

  return (
    <React.Fragment>
      {/* <LoadingDialog
        open={isLoading.value}
        ListItemTextProps={{ primary: "Saving" }}
      /> */}

      <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
        <DialogTitle>Save?</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            {activeTags.map((tag) => (
              <Box key={tag.id} m={1 / 2}>
                <DiscoverMovieTag tag={tag} />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={close}>
            Cancel
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
