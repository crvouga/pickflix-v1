import { IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflowX: "auto",
    flexWrap: "nowrap",
  },
  iconButton: {
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
}));

export default () => {
  const classes = useStyles();

  const actions = [
    // {
    //   icon: <ThumbDownIcon />,
    //   text: "Dislike",
    // },
    {
      icon: true ? <VisibilityOffIcon /> : <VisibilityIcon />,
      text: "Watched",
    },
    {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      text: "Watchlist",
    },
    // {
    //   icon: <ThumbUpIcon />,
    //   text: "Like",
    // },
    {
      icon: true ? <FavoriteBorderIcon /> : <FavoriteIcon />,
      text: "Favorite",
    },
    {
      icon: true ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />,
      text: "Save",
    },
  ];

  return (
    <Toolbar className={classes.root}>
      {actions.map(({ icon, text, onClick }) => (
        <IconButton
          key={text}
          onClick={onClick}
          classes={{ label: classes.iconButton }}
        >
          {icon}
          <Typography variant="subtitle2">{text}</Typography>
        </IconButton>
      ))}
    </Toolbar>
  );
};
