import { IconButton, makeStyles, Box, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React from "react";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    width: "48px",
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
    {
      icon: true ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />,
      text: "Like",
    },
    // {
    //   icon: true ? <FavoriteBorderIcon /> : <FavoriteIcon />,
    //   text: "Favorite",
    // },
    {
      icon: true ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />,
      text: "Save",
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      overflowX="auto"
      flexWrap="nowrap"
    >
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
    </Box>
  );
};
