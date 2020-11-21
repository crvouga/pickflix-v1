import { createEventEmitter } from "../../../common/utility";
import { useDeleteListMutation } from "../../query";
import { useDeleteListFormState } from "./delete-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useDeleteListFormState();
  const mutate = useDeleteListMutation();

  const submit = async ({ listId }: { listId: string }) => {
    eventEmitter.emit("submit");
    try {
      await mutate({ listId });
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
