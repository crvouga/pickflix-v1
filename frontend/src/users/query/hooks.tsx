import { useQuery } from "react-query";
import { getCurrentUser, queryKeys } from ".";

export const useQueryCurrentUser = () => {
  return useQuery(queryKeys.currentUser(), () => getCurrentUser(), {
    retry: 0,
  });
};
