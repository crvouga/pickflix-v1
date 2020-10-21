import { useQueryCache } from "react-query";
import useSnackbar from "../../snackbar/useSnackbar";
import { deleteListMutation } from "../query";
import { useHistory } from "react-router";

export default ({ listId }: { listId: string }) => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const history = useHistory();

  const submit = async () => {
    try {
      await deleteListMutation(queryCache)({ listId });
      snackbar.display({
        message: "Deleted list",
      });
    } catch (error) {
      snackbar.display({
        message: "Failed to delete list",
      });
      throw error;
    } finally {
      history.push("/profile");
    }
  };

  return {
    submit,
  };
};
