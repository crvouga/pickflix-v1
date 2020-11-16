import React from "react";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import { postListItem, PostListItemParams } from "../query";
import { useAddListItemFormState } from "./add-list-item-form";

export default () => {
  const snackbar = useSnackbar();
  const addListItemFormState = useAddListItemFormState();

  const submit = async (params: PostListItemParams) => {
    if (!params.listId) {
      return;
    }

    try {
      await postListItem(params);
      snackbar.display({
        message: `Added to list`,
        action: <ViewListButton listId={params.listId} />,
      });
    } catch (error) {
      snackbar.display({
        message: `Something went wrong`,
      });
    } finally {
      addListItemFormState.reset();
    }
  };

  return {
    ...addListItemFormState,
    submit,
  };
};
