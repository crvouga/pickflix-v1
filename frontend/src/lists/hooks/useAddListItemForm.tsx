import React from "react";
import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import { addListItemMutation, queryKeys } from "../query";
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
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const addListItemFormState = useAddListItemFormState();

  const submit = async (listId: string) => {
    const itemInfo = addListItemFormState.itemInfos[0];
    const lists = queryCache.getQueryData<IList[]>(queryKeys.lists());
    const list = lists?.find((list) => list.id === listId);

    try {
      if (!list) {
        throw new Error("list doesn't exists");
      }

      await addListItemMutation(queryCache)({
        ...itemInfo,
        listId: list.id,
      });

      snackbar.display({
        message: `Added to "${list.title}"`,
        action: <ViewListButton listId={listId} />,
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
