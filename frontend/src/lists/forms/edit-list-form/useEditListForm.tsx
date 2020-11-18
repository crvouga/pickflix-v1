import { createEventEmitter } from "../../../utils";
import { PatchListParams, useEditListMutation } from "../../query";
import { useEditListFormState } from "./edit-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useEditListFormState();
  const mutate = useEditListMutation();

  const submit = async (params: PatchListParams) => {
    eventEmitter.emit("submit");
    try {
      await mutate(params);
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
    submit,
    eventEmitter,
  };
};
