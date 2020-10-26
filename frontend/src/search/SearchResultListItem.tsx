import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { ListItemProps } from "material-ui";
import moment from "moment";
import { uniqBy } from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import { SearchResult } from "./query";
import { search } from "./redux/search";

type Props = ListItemProps & {
  result: SearchResult;
};

export default ({ result, ...ListItemProps }: Props) => {
  const makeImageUrl = useMakeImageUrl();
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
            <Avatar variant="square" src={makeImageUrl(4, result)}>
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
            <Avatar src={makeImageUrl(4, result)} />
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
