import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import Repeat from "../../../common/components/Repeat";
import { MediaId } from "../../../media/tmdb/types";
import MovieListItemContainer from "../../../movie/components/MovieListItemContainer";
import { useQueryCurrentUser, UserAggergation } from "../../../user/query";
import {
  toAutoListName,
  useQueryAutoLists,
  useQueryLists,
  ListAggergation,
  AutoListAggergation,
} from "../../query";
import { CreateListButton } from "./buttons/CreateListButton";
import { ToggleButton, ToggleButtonSkeleton } from "./buttons/ToggleButton";
import { useToggleFormState } from "./toggle-form";
import InfiniteScrollBottom from "../../../common/components/InfiniteScrollBottom";
import { useListener } from "../../../common/utility";
import { eventEmitterCreateListWithListItemsForm } from "../create-list-with-list-items-form/create-list-with-list-items-form";

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

const ToggleForm = ({
  mediaId,
  lists,
  autoLists,
}: {
  mediaId: MediaId;
  lists: ListAggergation[];
  autoLists: AutoListAggergation[];
}) => {
  const history = useHistory();
  const { listIds, toggle, setListIds } = useToggleFormState();

  useEffect(() => {
    const initialListIds = [...lists, ...autoLists]
      .filter((_) => Boolean(_.includeListItemWithMediaId))
      .map((_) => _.list.id)
      .reduce((listIds, listId) => ({ ...listIds, [listId]: listId }), {});

    setListIds(initialListIds);
  }, []);

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

export const ToggleFormQueryContainer = ({
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

  useListener(
    eventEmitterCreateListWithListItemsForm,
    "submitSuccess",
    (list) => {
      queryLists.refetch();
    }
  );

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
    <React.Fragment>
      <ToggleForm mediaId={mediaId} lists={lists} autoLists={autoLists} />
      <InfiniteScrollBottom fetchMoreRef={fetchMoreRef} />
    </React.Fragment>
  );
};

export const ToggleFormContainer = () => {
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

  return (
    <ToggleFormQueryContainer mediaId={mediaId} currentUser={currentUser} />
  );
};
