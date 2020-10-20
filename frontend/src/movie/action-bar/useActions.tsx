import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import { useDispatch } from "react-redux";
import AutoListIcon from "../../lists/auto-list/AutoListIcon";
import useAutoListLogic from "../../lists/auto-list/useAutoListLogic";
import { addListItemsForm } from "../../lists/redux/add-list-items-form";
import useModal from "../../navigation/modals/useModal";
import { TmdbMediaType } from "../../tmdb/types";

type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export default ({ tmdbMediaType, tmdbMediaId }: Props) => {
  const dispatch = useDispatch();

  const addListItemModal = useModal("AddListItem");
  const watchNextList = useAutoListLogic("watch-next");
  const likedList = useAutoListLogic("liked");

  return {
    like: {
      icon: <AutoListIcon autoListKey="liked" />,
      label: "Like",
      onClick: async () => {
        if (likedList.status === "success") {
          await likedList.add({ tmdbMediaType, tmdbMediaId });
        }
      },
    },
    watchNext: {
      icon: <AutoListIcon autoListKey="watch-next" />,
      label: "Watch Next",
      onClick: async () => {
        if (watchNextList.status === "success") {
          await watchNextList.add({ tmdbMediaType, tmdbMediaId });
        }
      },
    },
    addListItem: {
      icon: true ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />,
      label: "Save",
      onClick: () => {
        dispatch(
          addListItemsForm.actions.setListItemInfos([
            {
              tmdbMediaType,
              tmdbMediaId,
            },
          ])
        );
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
