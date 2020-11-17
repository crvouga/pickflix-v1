import { createEventEmitter } from "../../../utils";
import { postListItem } from "../../query";
import { useAddListItemFormState } from "./add-list-item-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const addListItemFormState = useAddListItemFormState();
  const { listId, mediaId } = addListItemFormState;

  const submit = async () => {
    if (!listId || !mediaId) {
      return;
    }

    eventEmitter.emit("submit");
    try {
      await postListItem({
        listId,
        mediaId,
      });
      eventEmitter.emit("submitSuccess");
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
