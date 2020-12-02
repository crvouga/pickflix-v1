import { ButtonBaseProps } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import useModal from "../../../../app/modals/useModal";
import LabeledIconButton from "../../../../common/components/LabeledIconButton";
import { MediaId } from "../../../../media/tmdb/types";
import { useToggleFormState } from "../toggle-form";

export const ToggleFormModalButton = (props: ButtonBaseProps) => {
  return <LabeledIconButton label={"Lists"} icon={<ListIcon />} {...props} />;
};

export const ToggleFormModalButtonContainer = ({
  mediaId,
}: {
  mediaId: MediaId;
}) => {
  const { open } = useModal("ToggleForm");
  const { setMediaId, listIds } = useToggleFormState();
  return (
    <LabeledIconButton
      label={"Lists"}
      icon={
        Object.values(listIds).length === 0 ? (
          <ListIcon />
        ) : (
          <PlaylistAddCheckIcon />
        )
      }
      onClick={() => {
        setMediaId(mediaId);
        open();
      }}
    />
  );
};
