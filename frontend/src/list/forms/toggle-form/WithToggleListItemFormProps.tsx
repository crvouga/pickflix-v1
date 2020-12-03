import { MediaId } from "../../../media/tmdb/types";
import { useQueryAutoLists, useQueryLists } from "../../query";
import { ToggleListItemFormProps } from "./ToggleListItemForm";
import {
  useToggleFormState,
  toInitialMarkedListIds,
} from "./toggle-list-item-form";
import { useEffect } from "react";
import { useListener } from "../../../common/utility";
import { eventEmitterCreateListWithListItemsForm } from "../create-list-with-list-items-form/create-list-with-list-items-form";

type Node = JSX.Element | null | false;

type Props = {
  mediaId: MediaId;
  renderLoading?: () => Node;
  renderError?: () => Node;
  renderSuccess?: (_: ToggleListItemFormProps) => Node;
};

export const WithToggleListItemFormProps = ({
  mediaId,
  renderError,
  renderLoading,
  renderSuccess,
}: Props) => {
  const queryAutoLists = useQueryAutoLists({
    includeListItemWithMediaId: mediaId,
  });
  const { fetchMoreRef, ...queryLists } = useQueryLists({
    includeListItemWithMediaId: mediaId,
  });

  const { setMarkedListIds } = useToggleFormState();

  useListener(eventEmitterCreateListWithListItemsForm, "submitSuccess", () => {
    queryAutoLists.refetch();
    queryLists.refetch();
  });

  const lists = queryLists.data?.flatMap((page) => page.results) || [];
  const autoLists = queryAutoLists.data || [];

  useEffect(() => {
    setMarkedListIds(
      toInitialMarkedListIds({
        mediaId,
        lists,
        autoLists,
      })
    );
  }, [autoLists.length, lists.length]);

  if (queryAutoLists.error || queryLists.error) {
    return (renderError && renderError()) || null;
  }

  if (queryAutoLists.data === undefined || queryLists.data === undefined) {
    return (renderLoading && renderLoading()) || null;
  }

  return (
    (renderSuccess &&
      renderSuccess({
        lists,
        autoLists,
        fetchMoreRef,
        mediaId,
      })) ||
    null
  );
};
