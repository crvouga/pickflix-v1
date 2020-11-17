import { Paginated } from "../../../common/types";
import { createEventEmitter } from "../../../utils";
import { deleteListItems, ListItemAggergation } from "../../query";
import { useRemoveListItemsFormState } from "./remove-list-items-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

type Data = Paginated<ListItemAggergation>[];

const optimisticUpdate = (
  data: Data,
  listItemIds: { [id: string]: string }
): Data => {
  return data.map((_) => ({
    ..._,
    results: _.results.filter((_) => _.listItem.id in listItemIds),
  }));
};

export default () => {
  const state = useRemoveListItemsFormState();
  const { listItemIds } = state;

  const submit = async () => {
    eventEmitter.emit("submit");
    try {
      await deleteListItems(Object.values(listItemIds).map((id) => ({ id })));
      eventEmitter.emit("submitSuccess");
    } catch (error) {
      eventEmitter.emit("submitError");
      throw error;
    } finally {
      eventEmitter.emit("submitSettled");
    }
  };

  return {
    ...state,
    eventEmitter,
    submit,
  };
};
