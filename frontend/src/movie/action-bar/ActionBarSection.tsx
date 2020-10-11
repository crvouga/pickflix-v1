import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React from "react";
import { useParams } from "react-router";
import useModal from "../../navigation/modals/useModal";
import { useDispatch } from "react-redux";
import { addListItemsForm } from "../../lists/redux/add-list-items-form";

const useStylesIconButton = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.active,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.5em",
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

export default () => {
  const classesIconButton = useStylesIconButton();

  const dispatch = useDispatch();
  const { movieId } = useParams<{ movieId: string }>();
  const addListItemModal = useModal("AddListItem");

  const actionBarItems = [
    {
      icon: false ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />,
      label: "Like",
      onClick: () => {},
    },
    {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      label: "Watch Next",
      onClick: () => {},
    },
    {
      icon: true ? <PeopleOutlineIcon /> : <PeopleIcon />,
      label: "Watch With",
      onClick: () => {},
    },
    {
      icon: true ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />,
      label: "Save",
      onClick: () => {
        dispatch(
          addListItemsForm.actions.setListItemInfos([
            {
              tmdbMediaType: "movie",
              tmdbMediaId: movieId,
            },
          ])
        );
        addListItemModal.open();
      },
    },
  ];

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="nowrap">
      {actionBarItems.map(({ icon, label, onClick }) => (
        <IconButton key={label} onClick={onClick} classes={classesIconButton}>
          {icon}
          <Typography color="inherit" variant="subtitle2">
            {label}
          </Typography>
        </IconButton>
      ))}
    </Box>
  );
};
