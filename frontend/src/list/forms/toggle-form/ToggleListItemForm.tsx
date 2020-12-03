import {
  Box,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useModal from "../../../app/modals/useModal";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import Repeat from "../../../common/components/Repeat";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import { SlideUp } from "../../../common/components/TransitionComponents";
import {
  FetchMoreRef,
  InfiniteScrollBottom,
} from "../../../common/infinite-scroll";
import { MediaId } from "../../../media/tmdb/types";
import MovieListItemContainer from "../../../movie/components/MovieListItemContainer";
import {
  AutoListAggergation,
  ListAggergation,
  toAutoListName,
} from "../../query";
import {
  CreateListButton,
  DoneButton,
  ToggleButton,
  ToggleButtonSkeleton,
} from "./buttons";
import { useToggleFormState } from "./toggle-list-item-form";
import { AUTO_LIST_KEY_ORDER } from "./ToggleListItemActionBar";

export const ToggleListItemFormSkeleton = ({
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

const CreateListButtonContainer = ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("CreateListWithListItemsForm");
  const toggleListItemFormModal = useModal("ToggleListItemForm");

  return (
    <CreateListButton
      onClick={() => {
        toggleListItemFormModal.close();
        open({ mediaIds: [mediaId] });
      }}
    />
  );
};

export type ToggleListItemFormProps = {
  mediaId: MediaId;
  autoLists: AutoListAggergation[];
  lists: ListAggergation[];
  fetchMoreRef: FetchMoreRef;
};

const ToggleListItemForm = (props: ToggleListItemFormProps) => {
  const { mediaId, lists, autoLists, fetchMoreRef } = props;
  const history = useHistory();
  const { markedListIds, toggle } = useToggleFormState();

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

      {AUTO_LIST_KEY_ORDER.map((autoListKey) => {
        const autoList = autoLists.find(
          (autoList) => autoList.list.key === autoListKey
        );

        if (!autoList) {
          return null;
        }

        return (
          <ToggleButton
            key={autoList.list.id}
            checked={autoList.list.id in markedListIds}
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
        );
      })}

      <Divider />

      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Lists"
        />
      </ListItem>

      <CreateListButtonContainer mediaId={mediaId} />

      {lists.map((list) => (
        <ToggleButton
          key={list.list.id}
          checked={list.list.id in markedListIds}
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
      <InfiniteScrollBottom fetchMoreRef={fetchMoreRef} />
    </List>
  );
};

export const ToggleListItemFormModal = ({
  isOpen,
  close,
  ToggleListItemFormProps,
}: {
  isOpen: boolean;
  close: () => void;
  ToggleListItemFormProps: ToggleListItemFormProps;
}) => {
  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={isOpen}
      onClose={close}
      keepMounted
    >
      <ToggleListItemForm {...ToggleListItemFormProps} />
      <Hidden smUp>
        <Box position="fixed" bottom={0} width="100%">
          <DoneButton onClick={close} />
        </Box>
      </Hidden>
    </ResponsiveDialog>
  );
};
