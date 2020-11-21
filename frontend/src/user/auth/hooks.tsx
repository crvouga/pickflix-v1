import { useQuery } from "react-query";
import { getCurrentUser, queryKeys, UserAggergation } from "../query";

export const useQueryCurrentUser = () => {
  return useQuery(queryKeys.currentUser(), () => getCurrentUser(), {
    retry: 0,
  });
};
