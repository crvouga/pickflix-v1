import { createEventEmitter } from "../../../common/utility";
import { PatchUserParams, useEditUserMutation } from "../../query";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const mutate = useEditUserMutation();

  const submit = async (params: PatchUserParams & { userId: string }) => {
    try {
      eventEmitter.emit("submit");
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
    submit,
    eventEmitter,
  };
};
