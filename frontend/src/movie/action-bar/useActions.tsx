import { CircularProgress } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React from "react";
import AutoListIcon from "../../lists/auto-lists/AutoListIcon";
import useAutoListToggleState from "../../lists/auto-lists/useAutoListToggleState";
import useAddListItemForm from "../../lists/hooks/useAddListItemForm";
import { AutoListKeys } from "../../lists/query";
import useModal from "../../navigation/modals/useModal";
import { TmdbMediaType } from "../../tmdb/types";

type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export default ({ tmdbMediaType, tmdbMediaId }: Props) => {
  const addListItemModal = useModal("AddListItem");
  const addListItemForm = useAddListItemForm();

  const likedState = useAutoListToggleState({
    autoListKey: AutoListKeys.Liked,
    tmdbMediaType,
    tmdbMediaId,
  });

  const watchNextState = useAutoListToggleState({
    autoListKey: AutoListKeys.WatchNext,
    tmdbMediaType,
    tmdbMediaId,
  });

  return {
    favorite: {
      icon: true ? <FavoriteBorderIcon /> : <FavoriteIcon />,
      label: "Favorite",
      onClick: () => {},
    },
    like: {
      icon: likedState.isLoading ? (
        <CircularProgress color="inherit" size="1.9em" />
      ) : (
        <AutoListIcon
          autoListKey={AutoListKeys.Liked}
          filled={likedState.isExists}
        />
      ),
      label: "Like",
      onClick: async () => {
        await likedState.toggle();
      },
    },
    watchNext: {
      icon: watchNextState.isLoading ? (
        <CircularProgress color="inherit" size="1.9em" />
      ) : (
        <AutoListIcon
          autoListKey={AutoListKeys.WatchNext}
          filled={watchNextState.isExists}
        />
      ),
      label: "Watch Next",
      onClick: async () => {
        await watchNextState.toggle();
      },
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
