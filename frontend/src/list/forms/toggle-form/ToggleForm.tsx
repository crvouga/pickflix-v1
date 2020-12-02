import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import Repeat from "../../../common/components/Repeat";
import { MediaId } from "../../../media/tmdb/types";
import MovieListItemContainer from "../../../movie/components/MovieListItemContainer";
import { useQueryCurrentUser, UserAggergation } from "../../../user/query";
import { toAutoListName, useQueryAutoLists, useQueryLists } from "../../query";
import { CreateListButton } from "./buttons/CreateListButton";
import { ToggleButton, ToggleButtonSkeleton } from "./buttons/ToggleButton";
import { useToggleFormState } from "./toggle-form";

export const ToggleFormSkeleton = ({
  autoListCount,
  listCount,
}: {
  autoListCount: number;
  listCount: number;
}) => {
  return (
    <List>
      <ListItemSkeleton avatarShape="rect" />
      <Divider />
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Auto Lists"
        />
      </ListItem>
      <Repeat count={autoListCount}>
        <ToggleButtonSkeleton />
      </Repeat>
      <Divider />
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Lists"
        />
      </ListItem>
      <CreateListButton />
      <Repeat count={listCount}>
        <ToggleButtonSkeleton />
      </Repeat>
    </List>
  );
};

export const ToggleForm = ({
  mediaId,

  currentUser,
}: {
  mediaId: MediaId;
  currentUser: UserAggergation;
}) => {
  const { fetchMoreRef, ...queryLists } = useQueryLists({
    includeListItemWithMediaId: mediaId,
  });
  const queryAutoLists = useQueryAutoLists({
    includeListItemWithMediaId: mediaId,
  });
  const history = useHistory();
  const { listIds, toggle, setListIds } = useToggleFormState();

  useEffect(() => {
    if (queryLists.data && queryAutoLists.data) {
      const lists = queryLists.data.flatMap((page) => page.results);
      const autoLists = queryAutoLists.data;
      const newListIds = [...lists, ...autoLists]
        .filter((_) => Boolean(_.includeListItemWithMediaId))
        .map((_) => _.list.id)
        .reduce((listIds, listId) => ({ ...listIds, [listId]: listId }), {});

      setListIds(newListIds);
    }
  }, [queryLists.data, queryAutoLists.data]);

  if (queryLists.error || queryAutoLists.error) {
    return null;
  }

  if (queryLists.data === undefined || queryAutoLists.data === undefined) {
    return (
      <ToggleFormSkeleton
        autoListCount={currentUser.autoListCount}
        listCount={currentUser.listCount}
      />
    );
  }

  const lists = queryLists.data.flatMap((page) => page.results);
  const autoLists = queryAutoLists.data;

  return (
    <List>
      <MovieListItemContainer mediaId={mediaId} />
      <Divider />
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Auto Lists"
        />
      </ListItem>
      {autoLists.map((autoList) => (
        <ToggleButton
          key={autoList.list.id}
          checked={autoList.list.id in listIds}
          title={toAutoListName(autoList.list.key)}
          onClick={() => {
            toggle({
              listId: autoList.list.id,
              mediaId,
            });
          }}
          onSecondaryActionClick={() => {
            history.push(`/auto-list/${autoList.list.id}`);
          }}
        />
      ))}

      <Divider />
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Lists"
        />
      </ListItem>
      <CreateListButton />
      {lists.map((list) => (
        <ToggleButton
          key={list.list.id}
          checked={list.list.id in listIds}
          title={list.list.title}
          onClick={() => {
            toggle({
              listId: list.list.id,
              mediaId,
            });
          }}
          onSecondaryActionClick={() => {
            history.push(`/list/${list.list.id}`);
          }}
        />
      ))}
    </List>
  );
};

export default () => {
  const query = useQueryCurrentUser();
  const { mediaId } = useToggleFormState();

  if (query.error) {
    return <ToggleFormSkeleton autoListCount={2} listCount={3} />;
  }

  if (query.data === undefined) {
    return <ToggleFormSkeleton autoListCount={2} listCount={3} />;
  }

  const currentUser = query.data;

  if (!currentUser) {
    return <ToggleFormSkeleton autoListCount={2} listCount={3} />;
  }

  if (!mediaId) {
    return null;
  }

  return <ToggleForm mediaId={mediaId} currentUser={currentUser} />;
};
