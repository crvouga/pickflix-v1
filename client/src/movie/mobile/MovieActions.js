import {
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    paddingTop: 0,
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
  const theme = useTheme();

  const actions = [
    {
      icon: true ? <FavoriteBorderIcon /> : <FavoriteIcon />,
      text: "Favorite",
    },
    // {
    //   icon: <ThumbUpIcon />,
    //   text: "Like",
    // },
    // {
    //   icon: <ThumbDownIcon />,
    //   text: "Dislike",
    // },
    // {
    //   icon: true ? <VisibilityOffIcon /> : <VisibilityIcon />,
    //   text: "Seen It",
    // },
    {
      icon: true ? <BookmarkBorderIcon /> : <BookmarkIcon />,
      text: "Watchlist",
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
