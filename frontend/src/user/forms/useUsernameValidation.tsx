import { useDebounce } from "use-debounce/lib";
import { useQueryUsers } from "../query";
//copyed from server
const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const isValidUsername = (username: string) =>
  USERNAME_REGEXP.test(username) && username.length > 0;

export default (username: string) => {
  const [debouncedUsername] = useDebounce(username, 1000 / 3);

  const query = useQueryUsers({
    username: debouncedUsername,
  });

  const isLoading = query.status === "loading";

  const usersWithUsername = query.data ?? [];

  const isInvalid = usersWithUsername.length > 0 || !isValidUsername(username);

  const helperText =
    usersWithUsername.length > 0
      ? "Username taken"
      : !isValidUsername(username) && username.length !== 0
      ? "Invalid username"
      : "";

  return {
    isInvalid,
    helperText,
    isLoading,
  };
};
