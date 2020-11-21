import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import MovieListItemContainer from "../../../movie/components/MovieListItemContainer";
import useModal from "../../../app/modals/useModal";
import { MediaId } from "../../../media/tmdb/types";
import { useQueryCurrentUser, UserAggergation } from "../../../user/query";
import {
  AutoListKeys,
  toAutoListName,
  useQueryAutoLists,
  useQueryLists,
} from "../../query";
import useCreateListWithListItemsForm from "../create-list-with-list-items-form/useCreateListWithListItemsForm";
import { useToggleListItemFormState } from "./toggle-list-item-form";
import ToggleListItemListItem, {
  ToggleListItemListItemSkeleton,
} from "./ToggleListItemListItem";

const CreateListListItem = ({ mediaId }: { mediaId?: MediaId }) => {
  const { open } = useModal("CreateListWithListItemsForm");
  const { setMediaIds } = useCreateListWithListItemsForm();

  return (
    <ListItem
      button
      onClick={() => {
        if (mediaId) {
          setMediaIds([mediaId]);
        }
        open();
      }}
    >
      <ListItemIcon color="inherit">
        <Box color="primary.main">
          <AddIcon color="inherit" />
        </Box>
      </ListItemIcon>
      <Box color="primary.main">
        <ListItemText
          primaryTypographyProps={{ color: "inherit" }}
          primary="Create New List"
        />
      </Box>
    </ListItem>
  );
};

const TitleListItem = (props: ListItemTextProps) => {
  return (
    <ListItem>
      <ListItemText primaryTypographyProps={{ variant: "h6" }} {...props} />
    </ListItem>
  );
};

const ToggleListItemListSkeleton = ({
  autoListCount,
  listCount,
}: {
  autoListCount: number;
  listCount: number;
}) => {
  return (
    <List>
      <TitleListItem primary="Auto Lists" />

      {[...Array(autoListCount)].map((_, index) => (
        <ToggleListItemListItemSkeleton key={index} />
      ))}

      <Divider />

      <TitleListItem primary="Lists" />

      <CreateListListItem />

      {[...Array(listCount)].map((_, index) => (
        <ToggleListItemListItemSkeleton key={index} />
      ))}
    </List>
  );
};

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
      <ToggleListItemListSkeleton
        listCount={currentUser.listCount}
        autoListCount={Object.keys(AutoListKeys).length}
      />
    );
  }

  const autoLists = queryAutoLists.data;
  const lists = queryLists.data.flatMap((page) => page.results);

  return (
    <List>
      <TitleListItem primary="Auto Lists" />

      {autoLists.map((autoList) => (
        <ToggleListItemListItem
          key={autoList.list.id}
          listId={autoList.list.id}
          title={toAutoListName(autoList.list.key)}
          path={`/auto-list/${autoList.list.id}`}
          mediaId={mediaId}
        />
      ))}

      <Divider />

      <TitleListItem primary="Lists" />

      <CreateListListItem mediaId={mediaId} />

      {lists.map((list) => (
        <ToggleListItemListItem
          key={list.list.id}
          listId={list.list.id}
          title={list.list.title}
          path={`/list/${list.list.id}`}
          mediaId={mediaId}
        />
      ))}
    </List>
  );
};

export default () => {
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
      <MovieListItemContainer mediaId={mediaId} />
      <Divider />
      <ToggleListItemList currentUser={currentUser} mediaId={mediaId} />
    </React.Fragment>
  );
};
