import { useDebounce } from "use-debounce/lib";
import { useQueryUsers } from "../query";

//copyed from server
const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export const isValidUsername = (username: string) =>
  USERNAME_REGEXP.test(username) && username.length > 0;

export const useIsUsernameTaken = (username: string) => {
  const [debouncedUsername] = useDebounce(username, 1000 / 3);
  const query = useQueryUsers({
    username: debouncedUsername,
  });
  const user = query.data?.results?.[0]?.user || undefined;

  const isTaken = Boolean(user);
  const isLoading = query.status === "loading";

  return {
    isTaken,
    isLoading,
  };
};
