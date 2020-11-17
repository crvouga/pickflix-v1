import { useQueryCache } from "react-query";
import { createEventEmitter } from "../../../utils";
import { deleteList, queryKeys } from "../../query";
import { ListAggergation } from "../../query/types";
import { useDeleteListFormState } from "./delete-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const state = useDeleteListFormState();
  const { listId } = state;

  const queryCache = useQueryCache();

  const submit = async () => {
    if (!listId) {
      return;
    }
    const key = queryKeys.lists();
    const previous = queryCache.getQueryData<ListAggergation[]>(key) || [];

    try {
      eventEmitter.emit("submit");

      const optimistic = previous.filter((list) => list.list.id !== listId);
      queryCache.setQueryData(key, optimistic);

      await deleteList({ listId });
      queryCache.removeQueries(queryKeys.list({ listId }));

      eventEmitter.emit("submitSuccess");
    } catch (error) {
      queryCache.setQueryData(key, previous);
      eventEmitter.emit("submitError");
      throw error;
    } finally {
      queryCache.invalidateQueries(key);
      eventEmitter.emit("submitSettled");
    }
  };

  return {
    ...state,
    eventEmitter,
    submit,
  };
};
