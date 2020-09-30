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
import * as queryConfigs from "../../tmdb/redux/query-configs";
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
  const isLikedConfig = queryConfigs.isLikedRequest(tmdbMedia);

  useEffect(() => {
    if (authStatus === "signedIn") {
      dispatch(actions.query.requestAsync(isLikedConfig));
    }
  }, [dispatch, authStatus, movieId]);

  const isLiked = useSelector(selectors.tmdb.isLiked(tmdbMedia));

  const actionBarItems = [
    {
      icon: isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />,
      label: "Like",
      onClick: () => {
        dispatch(actions.tmdb.toggleLike(tmdbMedia));
      },
    },
    {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      label: "Watch Next",
      onClick: () => {
        dispatch(
          actions.lists.toggleWatchNext({
            tmdbMediaType: "movie",
            tmdbMediaId: movieId,
          })
        );
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
        dispatch(
          actions.router.open({
            name: ModalName.SaveToList,
            props: { movieId },
          })
        );
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
