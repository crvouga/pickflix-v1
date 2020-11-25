import { useDebounce } from "use-debounce/lib";
import {
  isValidEmailAddress,
  isValidUsername,
  useQueryUsers,
  User,
} from "../query";

export const useIsUsernameTaken = (username: string) => {
  const [debounced] = useDebounce(username, 1000 / 3);
  const query = useQueryUsers(
    {
      username: debounced,
    },
    {
      retry: 0,
    }
  );
  const user = query.data?.results?.[0]?.user || undefined;
  const isTaken = Boolean(user);
  const isLoading = query.status === "loading";

  return {
    isTaken,
    isLoading,
  };
};

export const useIsEmailAddressTaken = (emailAddress: string) => {
  const [debounced] = useDebounce(emailAddress, 1000 / 3);
  const query = useQueryUsers({
    emailAddress: debounced,
  });
  const user = query.data?.results?.[0]?.user || undefined;
  const isTaken = Boolean(user);
  const isLoading = query.status === "loading";

  return {
    isTaken,
    isLoading,
  };
};

export const useUsernameValidation = (username: string) => {
  const { isTaken, isLoading } = useIsUsernameTaken(username);
  const isValid = isValidUsername(username);
  return {
    isValid,
    isTaken,
    isLoading,
  };
};

export const useEmailAddressValidation = (emailAddress: string) => {
  const { isTaken, isLoading } = useIsEmailAddressTaken(emailAddress);
  const isValid = isValidEmailAddress(emailAddress);
  return {
    isTaken,
    isLoading,
    isValid,
  };
};

export const useEditUsernameValidation = (
  currentUser: User,
  username: string
) => {
  const validation = useUsernameValidation(username);
  const isCurrentUsers = currentUser.username === username;
  return {
    ...validation,
    isTaken: validation.isTaken && !isCurrentUsers,
  };
};

export const useEditEmailAddressValidation = (
  currentUser: User,
  emailAddress: string
) => {
  const validation = useEmailAddressValidation(emailAddress);
  const isCurrentUsers = currentUser.emailAddress === emailAddress;
  return {
    ...validation,
    isTaken: validation.isTaken && !isCurrentUsers,
  };
};
