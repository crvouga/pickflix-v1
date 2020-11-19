import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Toolbar,
  Button,
} from "@material-ui/core";
import React from "react";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import MovieListItem from "../../../movie/components/MovieListItem";
import { useQueryMovie } from "../../../tmdb/query";
import { MediaId } from "../../../tmdb/types";
import { useQueryCurrentUser, UserAggergation } from "../../../users/query";
import {
  AutoListKeys,
  toAutoListName,
  useQueryAutoLists,
  useQueryLists,
} from "../../query";
import { useToggleListItemFormState } from "./toggle-list-item-form";
import ToggleListItemListItem, {
  ToggleListItemListItemSkeleton,
} from "./ToggleListItemListItem";

const ToggleListItemList = ({
  currentUser,
  mediaId,
}: {
  mediaId: MediaId;
  currentUser: UserAggergation;
}) => {
  const queryAutoLists = useQueryAutoLists({});
  const { fetchMoreRef, ...queryLists } = useQueryLists({});

  if (queryLists.error || queryAutoLists.error) {
    return null;
  }

  if (!queryLists.data || !queryAutoLists.data) {
    return (
      <React.Fragment>
        <List>
          <ListItem>
            <ListItemText primary="Auto Lists" />
          </ListItem>

          {Object.values(AutoListKeys).map((_, index) => (
            <ToggleListItemListItemSkeleton key={index} />
          ))}

          <Divider />

          <ListItem>
            <ListItemText primary="Lists" />
          </ListItem>

          {[...Array(currentUser.listCount)].map((_, index) => (
            <ToggleListItemListItemSkeleton key={index} />
          ))}
        </List>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemText primary="Auto Lists" />
        </ListItem>

        {queryAutoLists.data.map((autoList) => (
          <ToggleListItemListItem
            key={autoList.list.id}
            listId={autoList.list.id}
            title={toAutoListName(autoList.list.key)}
            path={`/auto-list/${autoList.list.id}`}
            mediaId={mediaId}
          />
        ))}

        <Divider />

        <ListItem>
          <ListItemText primary="Lists" />
        </ListItem>

        {queryLists.data.map((page) =>
          page.results.map((list) => (
            <ToggleListItemListItem
              key={list.list.id}
              listId={list.list.id}
              title={list.list.title}
              path={`/list/${list.list.id}`}
              mediaId={mediaId}
            />
          ))
        )}
      </List>
    </React.Fragment>
  );
};

const Media = ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryMovie({
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ListItemSkeleton avatarShape="rect" />;
  }

  return <MovieListItem movie={query.data} />;
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const query = useQueryCurrentUser();
  const { mediaId } = useToggleListItemFormState();

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return null;
  }

  const currentUser = query.data;

  if (!currentUser) {
    return null;
  }

  if (!mediaId) {
    return null;
  }

  return (
    <React.Fragment>
      <Media mediaId={mediaId} />
      <Divider />
      <ToggleListItemList currentUser={currentUser} mediaId={mediaId} />
      <Hidden smUp>
        <Toolbar>
          {onCancel && (
            <Button onClick={onCancel} size="large">
              Cancel
            </Button>
          )}
        </Toolbar>
      </Hidden>
    </React.Fragment>
  );
};
