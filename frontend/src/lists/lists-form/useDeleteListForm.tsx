import { useQueryCache } from "react-query";
import { useHistory } from "react-router";
import useSnackbar from "../../snackbar/useSnackbar";
import { deleteList, queryKeys } from "../query";
import { ListAggergation } from "../query/types";

export default () => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const history = useHistory();

  const submit = async ({ listId }: { listId: string }) => {
    const key = queryKeys.lists();
    const previous = queryCache.getQueryData<ListAggergation[]>(key) || [];
    try {
      const optimistic = previous.filter((list) => list.list.id !== listId);
      queryCache.setQueryData(key, optimistic);

      await deleteList({ listId });
      queryCache.removeQueries(queryKeys.list({ listId }));
      snackbar.display({
        message: "Deleted list",
      });
    } catch (error) {
      queryCache.setQueryData(key, previous);
      snackbar.display({
        message: "Failed to delete list",
      });
      throw error;
    } finally {
      queryCache.invalidateQueries(key);
      history.push("/user");
    }
  };

  return {
    submit,
  };
};
