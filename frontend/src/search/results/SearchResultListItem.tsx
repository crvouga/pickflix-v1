import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { ListItemProps } from "material-ui";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import makeImageUrl from "../../media/tmdb/makeImageUrl";
import UserListItem from "../../user/components/UserListItem";
import { SearchResult } from "../query";
import { useSearchState } from "../redux/search";

type Props = ListItemProps & {
  result: SearchResult;
};

export default ({ result, ...ListItemProps }: Props) => {
  const history = useHistory();
  const search = useSearchState();

  const handleClick = (result: SearchResult) => () => {
    switch (result.type) {
      case "movie":
        history.push(`/movie/${result.id}`);
        break;
      case "person":
        history.push(`/person/${result.id}`);
        break;
      case "user":
        history.push(`/user/${result.username}`);
        break;
    }
    search.pushHistory(result);
    search.setText("");
  };

  switch (result.type) {
    case "person":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
          <ListItemAvatar>
            <Avatar src={makeImageUrl(1, result)} />
          </ListItemAvatar>
          <ListItemText
            primary={result.name}
            secondary={result.knownForDepartment}
          />
        </ListItem>
      );
    case "movie":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
          <ListItemAvatar>
            <Avatar variant="square" src={makeImageUrl(1, result)}>
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={result.title}
            secondary={moment(result.releaseDate).format("Y")}
          />
        </ListItem>
      );
    case "user":
      return (
        <UserListItem
          user={result}
          ListItemTextProps={{ secondary: "User" }}
          onClick={handleClick(result)}
        />
      );

    default:
      return null;
  }
};
