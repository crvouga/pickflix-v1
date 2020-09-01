import {
  Avatar,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import auth from "../auth/redux";
import backendAPI from "../backendAPI";
import useBoolean from "../common/hooks/useBoolean";
import SettingsDrawer from "./SettingsDrawer";
import Todo from "./Todo";

export default () => {
  const theme = useTheme();
  const user = useSelector(auth.selectors.user);
  const status = useSelector(auth.selectors.status);
  const settingsDrawerOpen = useBoolean();

  const query = useQuery(
    ["user", "lists"],
    () => Promise.reject(), // backendAPI.get("/api/list").then((res) => res.data),
    {}
  );

  const lists = query.data?.results || [];

  return (
    <React.Fragment>
      <SettingsDrawer
        DrawerProps={{
          open: settingsDrawerOpen.value,
          onClose: settingsDrawerOpen.setFalse,
        }}
      />
      {status === "loading" && <LinearProgress />}
      <List>
        <ListItem divider button onClick={settingsDrawerOpen.setTrue}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "white" }} src={user.photoURL} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} secondary={user.email} />
        </ListItem>

        <ListItem button divider>
          <ListItemIcon>
            <AddIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: theme.palette.primary.main }}
            primary="Create New List"
          />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <BookmarkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Watchlist" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <ThumbUpIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Liked" />
        </ListItem>
        {query.status === "loading" && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {query.status === "success" &&
          (query.data?.results || []).map((list) => (
            <ListItem key={list.id}>
              <ListItemText primary={list.title} />
            </ListItem>
          ))}
      </List>

      <Todo />
    </React.Fragment>
  );
};
