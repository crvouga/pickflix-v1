import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React from "react";
import LabeledIconButton from "../../../common/components/LabeledIconButton";
import useModal from "../../../navigation/modals/useModal";
import { MediaId } from "../../../tmdb/types";
import { useToggleListItemFormState } from "./toggle-list-item-form";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("ToggleListItemForm");
  const { setMediaId } = useToggleListItemFormState();

  return (
    <LabeledIconButton
      label={"Lists"}
      icon={<PlaylistAddIcon />}
      onClick={() => {
        setMediaId(mediaId);
        open();
      }}
    />
  );
};
