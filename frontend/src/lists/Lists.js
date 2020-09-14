import {
  Avatar,
  Box,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import backendAPI from "../backendAPI";
import { actions } from "../redux";

export default () => {
  const dispatch = useDispatch();
  const query = useQuery(["/api/lists"], () =>
    backendAPI.get("/api/lists").then((res) => res.data)
  );

  const lists = query.data || [];

  useEffect(() => {
    dispatch(actions.lists.fetch());
  }, []);

  if (query.status === "loading") {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (query.status === "error") {
    return "error";
  }

  const onClickList = (list) => (e) => {
    dispatch(actions.router.push(`/list/${list.id}`));
  };

  return (
    <React.Fragment>
      {lists.map((list) => (
        <ListItem key={list.id} button divider onClick={onClickList(list)}>
          <ListItemAvatar>
            <Avatar variant="square">
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={list.title} secondary={list.description} />
        </ListItem>
      ))}
    </React.Fragment>
  );
};
