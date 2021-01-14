import { Paginated } from "../../../common/types";
import { createEventEmitter } from "../../../common/utility";
import { ListItemAggergation, useDeleteListItemsMutation } from "../../query";
import { useRemoveListItemsFormState } from "./remove-list-items-form";

type Data = Paginated<ListItemAggergation>[];

export const optimisticUpdate = (
  data: Data,
  listItemIds: { [id: string]: string }
): Data => {
  return data.map((_) => ({
    ..._,
    results: _.results.filter((_) => _.listItem.id in listItemIds),
  }));
};

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useRemoveListItemsFormState();
  const mutate = useDeleteListItemsMutation();
  const { listId, listItemIds } = formState;

  const submit = async () => {
    if (!listId) {
      throw new Error("listId required");
    }

    if (!listItemIds) {
      throw new Error("listItemIds required");
    }

    eventEmitter.emit("submit");
    try {
      await mutate(Object.values(listItemIds).map((id) => ({ listId, id })));
      eventEmitter.emit("submitSuccess");
    } catch (error) {
      eventEmitter.emit("submitError");
      throw error;
    } finally {
      eventEmitter.emit("submitSettled");
    }
  };

  return {
    ...formState,
    eventEmitter,
    submit,
  };
};
