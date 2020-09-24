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
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { actions } from "../../redux";

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

  const { movieId } = useParams();

  const actionBarItems = [
    {
      icon: true ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />,
      label: "Like",
      onClick: () => {
        // dispatch(
        //   actions.lists.addToLiked({ tmdbMediaType: "movie", tmdbId: movieId })
        // );
      },
    },
    {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      label: "Watch Next",
      onClick: () => {
        // dispatch(
        //   actions.lists.addToWatchList({
        //     tmdbMediaType: "movie",
        //     tmdbId: movieId,
        //   })
        // );
      },
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
        dispatch(actions.modal.open("SaveToListDialog", { movieId }));
      },
    },
  ];

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="nowrap">
      {actionBarItems.map(({ disabled, icon, label, onClick }) => (
        <IconButton
          // size="small"
          disabled={disabled}
          key={label}
          onClick={onClick}
          classes={classesIconButton}
        >
          {icon}
          <Typography color="inherit" variant="subtitle2">
            {label}
          </Typography>
        </IconButton>
      ))}
    </Box>
  );
};
