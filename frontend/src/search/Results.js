import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import moment from "moment";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import router from "../redux/router";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import search from "./redux";

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(search.selectors.sortedResults);
  const status = useSelector(search.selectors.status);
  const [triggerRef, inView] = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(search.actions.fetch());
    }
  }, [dispatch, inView]);

  const handleClick = (result) => () => {
    dispatch(search.actions.chose(result));
    if (result.mediaType === "movie") {
      dispatch(router.actions.push(`/movie/${result.id}`));
    }
    if (result.mediaType === "person") {
      dispatch(router.actions.push(`/person/${result.id}`));
    }
  };

  return (
    <div>
      <List>
        {results.map((result) =>
          result.mediaType === "movie" ? (
            <ListItem key={result.id} button onClick={handleClick(result)}>
              <ListItemAvatar>
                <Avatar variant="square" src={makeTMDbImageURL(4, result)}>
                  <MovieIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={result.title}
                secondary={moment(result.releaseDate).format("Y")}
              />
            </ListItem>
          ) : (
            <ListItem key={result.id} button onClick={handleClick(result)}>
              <ListItemAvatar>
                <Avatar src={makeTMDbImageURL(4, result)} />
              </ListItemAvatar>
              <ListItemText
                primary={result.name}
                secondary={result.knownForDepartment}
              />
            </ListItem>
          )
        )}
      </List>
      {status === "loading" && (
        <Box p={2} textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <div ref={triggerRef} />
    </div>
  );
};
