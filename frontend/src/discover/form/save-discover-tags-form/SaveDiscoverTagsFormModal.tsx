import {
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
import { DiscoverTagGroup } from "../../components/DiscoverTag";
import { IDiscoverTag } from "../../query/types";
import useDiscoverState from "../../redux/useDiscoverState";
import { useDiscoverPageUi } from "../../redux/discover-page-ui";

const postDiscoverTags = async ({
  key,
  tagsById,
}: {
  key: string;
  tagsById: {
    [id: string]: IDiscoverTag;
  };
}) => {
  await BackendAPI.post("/api/media/tmdb/discover/tags", {
    key,
    tagsById,
  });
};

const tagsByIdToKey = (tagsById: { [id: string]: IDiscoverTag }) => {
  const ids = Object.keys(tagsById);
  ids.sort();
  return ids.join(",");
};

export const useSaveDiscoverTagsMutation = () => {
  const { activeTagState } = useDiscoverState();
  const discoverPageUi = useDiscoverPageUi();
  const snackbar = useSnackbar();

  const submit = async () => {
    try {
      await postDiscoverTags({
        key: tagsByIdToKey(activeTagState.present.activeTagsById),
        tagsById: activeTagState.present.activeTagsById,
      });
      discoverPageUi.setDiscoverTagsTabValue("Saved");
      snackbar.display({
        message: "Saved",
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    submit,
  };
};

export const SaveDiscoverTagsFormModal = () => {
  const { activeTagState } = useDiscoverState();
  const discoverPageUi = useDiscoverPageUi();
  const { isOpen, close } = useModal("SaveDiscoverTagsForm");
  const snackbar = useSnackbar();
  const isLoading = useBoolean(false);

  const handleSubmit = async () => {
    try {
      isLoading.setTrue();
      close();

      await postDiscoverTags({
        key: tagsByIdToKey(activeTagState.present.activeTagsById),
        tagsById: activeTagState.present.activeTagsById,
      });
      discoverPageUi.setDiscoverTagsTabValue("Saved");
      snackbar.display({
        message: "Saved",
      });
    } catch (error) {
    } finally {
      isLoading.setFalse();
    }
  };

  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <DialogTitle>Save?</DialogTitle>
      <DialogContent>
        <DiscoverTagGroup tagsById={activeTagState.present.activeTagsById} />
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
  );
};
