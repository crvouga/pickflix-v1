import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { getUsersAutoLists, queryKeys } from "../lists/query";
import MovieAvatar from "../movie/components/MovieAvatar";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";
import { User } from "../users/query";

type Props = {
  user: User;
};

export default ({ user }: Props) => {
  const history = useHistory();
  const query = useQuery(queryKeys.userAutoLists(user), () =>
    getUsersAutoLists(user)
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const autoListsByKey = query.data;

  return (
    <React.Fragment>
      {autoListsByKey.liked.listItems.slice(0, 10).map((item) => (
        <React.Fragment key={item.listItem.id}>
          <ListItem
            button
            onClick={() => {
              history.push(`/movie/${item.tmdbData.id}`);
            }}
          >
            <ListItemAvatar>
              <MovieAvatar movie={item.tmdbData} />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.tmdbData.title}`}
              secondary="Related Movies"
            />
          </ListItem>
          <MoviePosterScroll movies={item.tmdbData.similar.results} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
