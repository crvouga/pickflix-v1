import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import moment from "moment";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { SearchResult } from "./query";
import { ListItemProps } from "material-ui";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "../redux/react-redux";
import { search } from "./redux/search";
import { uniqBy } from "ramda";

type Props = ListItemProps & {
  result: SearchResult;
};

export default ({ result, ...ListItemProps }: Props) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector(search.selectors.history);
  const history = useHistory();

  const handleClick = (result: SearchResult) => () => {
    dispatch(
      search.actions.setHistory(
        uniqBy((result) => result.id, [result, ...searchHistory])
      )
    );
    if (result.mediaType === "movie") {
      history.push(`/movie/${result.id}`);
    }
    if (result.mediaType === "person") {
      history.push(`/person/${result.id}`);
    }
  };

  switch (result.mediaType) {
    case "movie":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
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
      );

    case "person":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
          <ListItemAvatar>
            <Avatar src={makeTMDbImageURL(4, result)} />
          </ListItemAvatar>
          <ListItemText
            primary={result.name}
            secondary={result.knownForDepartment}
          />
        </ListItem>
      );

    case "tv":
      return null;
  }
};
