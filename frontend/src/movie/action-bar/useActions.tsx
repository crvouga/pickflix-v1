import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import { useDispatch } from "react-redux";
import AutoListIcon from "../../lists/AutoListIcon";
import useModal from "../../navigation/modals/useModal";
import { TmdbMediaType } from "../../tmdb/types";
import useAddListItemForm from "../../lists/hooks/useAddListItemForm";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export default ({ tmdbMediaType, tmdbMediaId }: Props) => {
  const addListItemModal = useModal("AddListItem");
  const addListItemForm = useAddListItemForm();

  return {
    favorite: {
      icon: true ? <FavoriteBorderIcon /> : <FavoriteIcon />,
      label: "Favorite",
      onClick: () => {},
    },
    like: {
      icon: <AutoListIcon autoListKey="liked" />,
      label: "Like",
      onClick: async () => {},
    },
    watchNext: {
      icon: <AutoListIcon autoListKey="watch-next" />,
      label: "Watch Next",
      onClick: async () => {},
    },
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
