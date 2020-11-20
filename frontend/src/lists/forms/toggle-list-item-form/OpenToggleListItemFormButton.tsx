import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import LabeledIconButton from "../../../common/components/LabeledIconButton";
import useModal from "../../../navigation/modals/useModal";
import { MediaId } from "../../../tmdb/types";
import { useQueryListItems } from "../../query";
import { useToggleListItemFormState } from "./toggle-list-item-form";

const ListsIcon = ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryListItems({ mediaId });

  if (query.error || !query.data || query.data?.[0].results.length === 0) {
    return <ListIcon />;
  }

  return <PlaylistAddCheckIcon />;
};

export default ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("ToggleListItemForm");
  const { setMediaId } = useToggleListItemFormState();

  const handleClick = () => {
    setMediaId(mediaId);
    open();
  };

  return (
    <LabeledIconButton
      label={"Lists"}
      icon={<ListsIcon mediaId={mediaId} />}
      onClick={handleClick}
    />
  );
};
