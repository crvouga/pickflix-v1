import * as R from "ramda";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  getList,
  getListItems,
  queryKeys,
  editListMutation,
  deleteListItemsMutation,
} from "./query";
import { ListItem } from "./types";
import { snackbar } from "../snackbar/redux/snackbar";
import { useDispatch } from "react-redux";

export default (listId: string) => {
  const dispatch = useDispatch();
  //
  const queryList = useQuery(queryKeys.list(listId), () => getList({ listId }));
  const queryListItems = useQuery(queryKeys.listItems(listId), () =>
    getListItems({ listId })
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

  const onSaveChanges = async () => {
    const title = inputRefTitle.current?.value || "";
    const description = inputRefDescription.current?.value || "";
    const listItemIds = Object.values(listItemDeletions);

    try {
      await Promise.all([
        editListMutation({ listId, title, description }),
        deleteListItemsMutation({
          listId,
          listItemIds,
        }),
      ]);
      dispatch(
        snackbar.actions.display({
          message: "Saved changes",
        })
      );
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: "Something went wrong",
        })
      );
    } finally {
    }
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
