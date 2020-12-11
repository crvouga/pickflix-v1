import { useEffect } from "react";
import { useListener } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import {
  GetListsParams,
  useQueryAutoLists,
  useQueryLists,
  useQueryListsFromMediaId,
} from "../../query";
import { eventEmitterCreateListWithListItemsForm } from "../create-list-with-list-items-form/create-list-with-list-items-form";
import { useToggleFormState } from "./toggle-list-item-form";
import { ToggleListItemFormProps } from "./ToggleListItemForm";

type Node = JSX.Element | null | false;

type Props = {
  mediaId: MediaId;
  GetListsParams: GetListsParams;
  renderDefault?: () => Node;
  renderSuccess?: (_: ToggleListItemFormProps) => Node;
};

export const WithToggleListItemFormProps = ({
  mediaId,
  renderDefault,
  renderSuccess,
  GetListsParams,
}: Props) => {
  const queryAutoLists = useQueryAutoLists({});
  const { fetchMoreRef, ...queryLists } = useQueryLists(GetListsParams);
  const queryListsFromMediaId = useQueryListsFromMediaId({ mediaId });

  useListener(eventEmitterCreateListWithListItemsForm, "submitSuccess", () => {
    queryAutoLists.refetch();
    queryLists.refetch();
    queryListsFromMediaId.refetch();
  });

  const lists = queryLists.data?.flatMap((page) => page.results) || [];
  const autoLists = queryAutoLists.data || [];
  const listsFromMediaId = queryListsFromMediaId.data || [];

  const { setMarkedListIds } = useToggleFormState();

  useEffect(() => {
    const listIds = listsFromMediaId
      .map((list) => list.id)
      .reduce((listIds, listId) => ({ ...listIds, [listId]: listId }), {});
    setMarkedListIds(listIds);
  }, [listsFromMediaId.length]);

  if (queryLists.data && queryAutoLists.data && renderSuccess) {
    return (
      renderSuccess({
        lists,
        autoLists,
        fetchMoreRef,
        mediaId,
      }) || null
    );
  }

  return renderDefault?.() || null;
};
