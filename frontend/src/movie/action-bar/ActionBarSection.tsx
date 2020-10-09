import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { actions, selectors } from "../../redux";
import { ModalName } from "../../redux/router/types";

import { TmdbMedia } from "../../tmdb/types";

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

  const tmdbMedia: TmdbMedia = {
    tmdbMediaId: movieId,
    tmdbMediaType: "movie",
  };

  const authStatus = useSelector(selectors.auth.authStatus);

  const isLiked = false;

  const actionBarItems = [
    {
      icon: isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />,
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
        if (authStatus === "signedOut") {
          dispatch(actions.router.push({ pathname: "/signIn" }));
        }
        if (authStatus === "signedIn") {
          dispatch(
            actions.router.open({
              name: ModalName.SaveToList,
              props: { movieId },
            })
          );
        }
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
