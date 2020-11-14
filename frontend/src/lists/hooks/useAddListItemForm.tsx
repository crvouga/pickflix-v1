import React from "react";
import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import {
  addListItemMutation,
  queryKeys,
  postListItem,
  PostListItemParams,
} from "../query";
import { List as IList } from "../query/types";
import { addListItemForm } from "../redux/add-list-item-form";

const useAddListItemFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(addListItemForm.selectors.slice);
  return {
    ...slice,
    ...bindActionCreators(addListItemForm.actions, dispatch),
  };
};

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
