import { MediaId } from "../../../tmdb/types";
import { createEventEmitter } from "../../../utils";
import { List, useAddListItemMutation } from "../../query";
import { useAddListItemFormState } from "./add-list-item-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: List;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const addListItemFormState = useAddListItemFormState();
  const [addListItemMutation] = useAddListItemMutation();

  const submit = async ({
    list,
    mediaId,
  }: {
    list: List;
    mediaId: MediaId;
  }) => {
    eventEmitter.emit("submit");
    try {
      await addListItemMutation({
        listId: list.id,
        mediaId,
      });
      eventEmitter.emit("submitSuccess", list);
    } catch (error) {
      eventEmitter.emit("submitError");
      throw error;
    } finally {
      eventEmitter.emit("submitSettled");
    }
  };

  return {
    ...addListItemFormState,
    eventEmitter,
    submit,
  };
};
