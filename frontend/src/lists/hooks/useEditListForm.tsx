import { useState } from "react";
import { useQueryCache } from "react-query";
import useSnackbar from "../../snackbar/useSnackbar";
import { deleteListItemsMutation, editListMutation } from "../query";
import { ListItem } from "../query/types";

const useEditListFormState = () => {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [deletions, setDeletions] = useState<{ [id: string]: string }>({});
  const reset = () => {
    setErrors([]);
    setDeletions({});
  };
  return {
    deletions,
    setDeletions,
    errors,
    setErrors,
    reset,
  };
};

export default ({ listId }: { listId: string }) => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const editListFormState = useEditListFormState();

  const toggleDeletion = (listItem: ListItem) => {
    const { [listItem.id]: id, ...ids } = editListFormState.deletions;
    editListFormState.setDeletions({
      ...ids,
      ...(id ? {} : { [listItem.id]: listItem.id }),
    });
  };

  const submit = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const { deletions } = editListFormState;

    try {
      await Promise.all([
        editListMutation(queryCache)({
          listId,
          title,
          description,
        }),
        deleteListItemsMutation(queryCache)({
          listId,
          listItemIds: Object.values(deletions),
        }),
      ]);

      snackbar.display({ message: "Saved Changes" });
    } catch (error) {
      const errors = error?.response?.data?.errors || [];
      if (errors.length > 0) {
        editListFormState.setErrors(errors);
      }
      throw error;
    }
  };

  return {
    ...editListFormState,
    toggleDeletion,
    submit,
  };
};
