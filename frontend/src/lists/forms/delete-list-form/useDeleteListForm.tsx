import { createEventEmitter } from "../../../utils";
import { useDeleteListMutation } from "../../query";
import { useDeleteListFormState } from "./delete-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const state = useDeleteListFormState();
  const [deleteListMutation] = useDeleteListMutation();
  const { listId } = state;

  const submit = async () => {
    if (!listId) {
      return;
    }

    try {
      eventEmitter.emit("submit");

      await deleteListMutation({ listId });

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
