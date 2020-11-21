import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { AutoListKeys } from "../list/query";
import { useQueryAutoLists } from "../list/query/hooks";
import MovieAvatar from "../movie/components/MovieAvatar";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";
import { UserAggergation } from "../user/query";

type Props = {
  user: UserAggergation;
};

export default ({ user }: Props) => {
  const history = useHistory();
  const query = useQueryAutoLists({
    ownerId: user.user.id,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const watchNext = query.data.find(
    (autoList) => autoList.list.key === AutoListKeys.WatchNext
  );

  if (!watchNext) {
    return null;
  }

  return (
    <React.Fragment>
      {watchNext.listItems.slice(0, 10).map(
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
