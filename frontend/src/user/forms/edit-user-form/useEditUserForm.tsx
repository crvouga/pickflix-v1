import { createEventEmitter } from "../../../common/utility";
import {
  PatchUserParams,
  useEditUserMutation,
  useQueryCurrentUser,
} from "../../query";
import useUsernameValidation from "../useUsernameValidation";
import { useEditUserFormState } from "./edit-user-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useEditUserFormState();

  const usernameValidation = useUsernameValidation(
    formState.user.username || ""
  );
  const mutate = useEditUserMutation();

  const submit = async (params: PatchUserParams) => {
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
  const isDisabled =
    usernameValidation.isInvalid || usernameValidation.isLoading;

  return {
    isDisabled,
    formState,
    usernameValidation,
    submit,
    eventEmitter,
  };
};
