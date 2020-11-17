import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import LabeledIconButton from "../../../common/components/LabeledIconButton";
import useModal from "../../../navigation/modals/useModal";
import { MediaId } from "../../../tmdb/types";
import { useQueryListItems } from "../../query";
import useAddListItemForm from "./useAddListItemForm";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const addListItemModal = useModal("AddListItemForm");
  const addListItemForm = useAddListItemForm();

  const query = useQueryListItems({
    mediaId,
  });

  const isSaved = query.data && query.data.results.length > 0;

  return (
    <LabeledIconButton
      label={isSaved ? "Saved" : "Save"}
      icon={isSaved ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
      onClick={() => {
        addListItemForm.setMediaId(mediaId);
        addListItemModal.open();
      }}
    />
  );
};
