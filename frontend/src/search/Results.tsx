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
import { actions, selectors } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { Result } from "./redux/types";
import ListItemSkeleton from "../common/components/ListItemSkeleton";

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(selectors.search.sortedResults);
  const text = useSelector(selectors.search.text);
  const status = useSelector(selectors.search.status);
  const canFetchMore = useSelector(selectors.search.canFetchMore);
  const [triggerRef, inView] = useInView();

  useEffect(() => {
    if (inView && canFetchMore) {
      dispatch(actions.search.fetch());
    }
  }, [inView]);

  const handleClick = (result: Result) => () => {
    dispatch(actions.search.chose(result));
    if (result.mediaType === "movie") {
      dispatch(actions.router.push({ pathname: `/movie/${result.id}` }));
    }
    if (result.mediaType === "person") {
      dispatch(actions.router.push({ pathname: `/person/${result.id}` }));
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
        {status === "loading" &&
          text.length > 0 &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <ListItemSkeleton key={n} />
          ))}
      </List>

      <div ref={triggerRef} />
    </div>
  );
};
