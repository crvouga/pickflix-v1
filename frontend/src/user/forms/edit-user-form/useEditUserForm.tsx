import { createEventEmitter } from "../../../common/utility";
import {
  isValidDisplayName,
  PatchUserParams,
  useEditUserMutation,
  User,
} from "../../query";
import {
  useEditEmailAddressValidation,
  useEditUsernameValidation,
} from "../validation";
import { useEditUserFormState } from "./edit-user-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export const useEditUserFormValidation = (
  currentUser: User,
  {
    username,
    emailAddress,
    displayName,
  }: { username: string; emailAddress: string; displayName: string }
) => {
  const usernameValidation = useEditUsernameValidation(currentUser, username);

  const emailAddressValidation = useEditEmailAddressValidation(
    currentUser,
    emailAddress
  );

  const displayNameValidation = {
    isValid: isValidDisplayName(displayName),
  };

  const isLoading =
    usernameValidation.isLoading || emailAddressValidation.isLoading;

  const isValid =
    usernameValidation.isValid &&
    emailAddressValidation.isValid &&
    displayNameValidation.isValid;

  const isTaken = usernameValidation.isTaken || emailAddressValidation.isTaken;

  const isDisabled = isLoading || !isValid || isTaken;

  return {
    isDisabled,
    username: usernameValidation,
    displayName: displayNameValidation,
    emailAddress: emailAddressValidation,
  };
};

export default () => {
  const formState = useEditUserFormState();
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
    formState,
    submit,
    eventEmitter,
  };
};
