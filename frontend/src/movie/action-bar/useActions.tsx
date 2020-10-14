import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React from "react";
import { useDispatch } from "react-redux";
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

  return {
    like: {
      icon: false ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />,
      label: "Like",
      onClick: () => {},
    },
    watchNext: {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      label: "Watch Next",
      onClick: () => {},
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
