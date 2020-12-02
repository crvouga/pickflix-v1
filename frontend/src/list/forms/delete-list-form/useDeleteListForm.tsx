import { createEventEmitter } from "../../../common/utility";
import { useDeleteListMutation } from "../../query";
import { useDeleteListFormState } from "./delete-list-form";

export const eventEmitterListForm = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useDeleteListFormState();
  const mutate = useDeleteListMutation();

  const submit = async ({ listId }: { listId: string }) => {
    eventEmitterListForm.emit("submit");
    try {
      await mutate({ listId });
      eventEmitterListForm.emit("submitSuccess");
    } catch (error) {
      eventEmitterListForm.emit("submitError");
      throw error;
    } finally {
      eventEmitterListForm.emit("submitSettled");
    }
  };

  return {
    ...formState,
    submit,
  };
};
