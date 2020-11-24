import { createEventEmitter } from "../../../common/utility";
import { PatchUserParams, useEditUserMutation } from "../../query";
import { isValidUsername, useIsUsernameTaken } from "../useUsernameValidation";
import { useEditUserFormState } from "./edit-user-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

const useUsernameValidation = (username: string) => {
  const { isTaken, isLoading } = useIsUsernameTaken(username);
  const isValid = isValidUsername(username);
  return {
    isValid,
    isTaken,
    isLoading,
  };
};

export default () => {
  const formState = useEditUserFormState();

  const usernameValidation = useUsernameValidation(
    formState.user?.username ?? ""
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
    !usernameValidation.isValid ||
    usernameValidation.isLoading ||
    usernameValidation.isTaken;

  return {
    isDisabled,
    usernameValidation,
    formState,
    submit,
    eventEmitter,
  };
};
