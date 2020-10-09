import * as R from "ramda";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery, queryCache } from "react-query";
import {
  ListItem,
  deleteListItems,
  fetchList,
  fetchListItems,
  patchList,
  queryKeys,
} from "./data";
import { useDispatch } from "react-redux";
import { actions } from "../redux";

export default (listId: string) => {
  const dispatch = useDispatch();
  //
  const queryList = useQuery(queryKeys.list(listId), () => fetchList(listId));
  const queryListItems = useQuery(queryKeys.listItems(listId), () =>
    fetchListItems(listId)
  );

  //

  const inputRefTitle = useRef<HTMLInputElement>();
  const inputRefDescription = useRef<HTMLInputElement>();
  const [listItemDeletions, setListItemDeletions] = useState<{
    [id: string]: string;
  }>({});

  //
  const toggleListItemDeletions = (listItem: ListItem) => () => {
    const toggle = R.ifElse(
      R.has(listItem.id),
      R.dissoc(listItem.id),
      R.assoc(listItem.id, listItem.id)
    );
    setListItemDeletions(toggle);
  };

  const onSaveChanges = () => {
    dispatch(
      actions.lists.editList({
        listId,
        title: inputRefTitle.current?.value || "",
        description: inputRefDescription.current?.value || "",
        listItemIds: R.values(listItemDeletions),
      })
    );
  };

  return {
    inputRefTitle,
    inputRefDescription,
    listItemDeletions,
    //
    toggleListItemDeletions,
    onSaveChanges,
    //
    queryList,
    queryListItems,
  };
};
