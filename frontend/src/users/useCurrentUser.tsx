import { useQuery } from "react-query";
import { getCurrentUser, queryKeys, User } from "./query";

export const useQueryCurrentUser = () => {
  return useQuery(queryKeys.currentUser(), () => getCurrentUser(), {
    retry: 0,
  });
};

export default (): User | "loading" | null => {
  const query = useQuery(queryKeys.currentUser(), () => getCurrentUser(), {
    retry: 0,
  });

  switch (query.status) {
    case "loading":
      return "loading";

    case "success":
      const currentUser = query.data;
      if (currentUser) {
        return currentUser.user;
      } else {
        return null;
      }

    default:
      return null;
  }
};
