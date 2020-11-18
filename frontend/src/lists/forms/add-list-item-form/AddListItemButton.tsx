import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import LabeledIconButton from "../../../common/components/LabeledIconButton";
import useModal from "../../../navigation/modals/useModal";
import { MediaId } from "../../../tmdb/types";

import useAddListItemForm from "./useAddListItemForm";
import { useQueryListItems } from "../../query/hooks";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const addListItemModal = useModal("AddListItemForm");
  const addListItemForm = useAddListItemForm();

  const query = useQueryListItems({
    mediaId,
  });

  const isSaved =
    query.data && query.data[0] && query.data[0].results.length > 0;

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
