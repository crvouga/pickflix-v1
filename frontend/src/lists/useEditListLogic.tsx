import * as R from "ramda";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { getList, getListItems, queryKeys } from "./query";
import { ListItem } from "./types";

export default (listId: string) => {
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
