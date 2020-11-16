import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import useAddListItemForm from "../../lists/list-items-form/useAddListItemForm";
import useModal from "../../navigation/modals/useModal";
import { TmdbMediaType } from "../../tmdb/types";

type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export default ({ tmdbMediaType, tmdbMediaId }: Props) => {
  const addListItemModal = useModal("AddListItem");
  const addListItemForm = useAddListItemForm();

  return {
    addListItem: {
      icon: true ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />,
      label: "Save",
      onClick: () => {
        addListItemForm.setItemInfos([
          {
            tmdbMediaType,
            tmdbMediaId,
          },
        ]);
        addListItemModal.open();
      },
    },
    watchWith: {
      icon: true ? <PeopleOutlineIcon /> : <PeopleIcon />,
      label: "Watch With",
      onClick: () => {},
    },
  };
};
