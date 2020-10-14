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
import { addWatchNextMutation } from "../../lists/query/mutation/add-watch-next";
import { snackbar } from "../../snackbar/redux/snackbar";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

type Props = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export default ({ tmdbMediaType, tmdbMediaId }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      onClick: async () => {
        try {
          await addWatchNextMutation({
            tmdbMediaId,
            tmdbMediaType,
          });
          dispatch(
            snackbar.actions.display({
              message: "Added to Watch Next",
              action: (
                <Button
                  color="primary"
                  onClick={() => history.push("/watch-next")}
                >
                  See List
                </Button>
              ),
            })
          );
        } catch (error) {
          dispatch(
            snackbar.actions.display({ message: "Failed to add to watch next" })
          );
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
