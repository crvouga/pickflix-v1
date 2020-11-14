import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { getUsersAutoLists, queryKeys } from "../lists/query";
import MovieAvatar from "../movie/components/MovieAvatar";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";
import { User, UserAggergation } from "../users/query";

type Props = {
  user: UserAggergation;
};

export default ({ user }: Props) => {
  const history = useHistory();
  const query = useQuery(queryKeys.userAutoLists(user.user), () =>
    getUsersAutoLists(user.user)
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
      {autoListsByKey["watch-next"].listItems.slice(0, 10).map(
        (item) =>
          item.tmdbData.similar.results && (
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
          )
      )}
    </React.Fragment>
  );
};
