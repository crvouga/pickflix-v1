import * as R from "ramda";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as queryConfigs from "./redux/query-configs";

const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export default () => {
  const dispatch = useDispatch();

  const queryConfig = queryConfigs.listsRequest();

  const query = useSelector(selectors.query.query({ url: queryConfig.url }));
  const lists = useSelector(selectors.lists.lists);

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.query.requestAsync(queryConfig));
    }, 2000);
  }, []);

  const onClickList = (list) => (e) => {
    dispatch(actions.router.push(`/list/${list.id}`));
  };

  console.log({ lists });
  return (
    <React.Fragment>
      <List>
        {lists.map((list) => (
          <ListItem key={list.id} button divider onClick={onClickList(list)}>
            <Box marginX={1}>
              <AvatarGroup spacing="small">
                {R.take(3, list.listItems || []).map((listItem) => (
                  <Avatar
                    variant="square"
                    src={makeTMDbImageURL(3, listItem.tmdbData)}
                  >
                    <MovieIcon />
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
            <ListItemText
              primary={list.title}
              secondary={`${list.listItemCount || 0} items`}
            />
          </ListItem>
        ))}
      </List>

      {query.isPending && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
};
