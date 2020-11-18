import { useState } from "react";
import { useQueryCache } from "react-query";
import useSnackbar from "../../../snackbar/useSnackbar";
import { ListItem } from "../../query";

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

export default () => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const editListFormState = useEditListFormState();

  const submit = async ({
    listId,
    title,
    description,
    listItemIds,
  }: {
    listId: string;
    title: string;
    description: string;
    listItemIds: string[];
  }) => {
    try {
      // await Promise.all([
      //   editListMutation(queryCache)({
      //     listId,
      //     title,
      //     description,
      //   }),
      //   deleteListItemsMutation(queryCache)(listItemIds.map((id) => ({ id }))),
      // ]);

      snackbar.display({ message: "Saved Changes" });
    } catch (error) {
      const errors = error?.response?.data?.errors || [];
      if (errors.length > 0) {
        editListFormState.setErrors(errors);
      }
      throw error;
    }
  };

  const toggleDeletion = (listItem: ListItem) => {
    const { [listItem.id]: id, ...ids } = editListFormState.deletions;
    editListFormState.setDeletions({
      ...ids,
      ...(id ? {} : { [listItem.id]: listItem.id }),
    });
  };

  return {
    ...editListFormState,
    toggleDeletion,
    submit,
  };
};
