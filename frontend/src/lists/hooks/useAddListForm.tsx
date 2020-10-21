import React from "react";
import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import { addListItemMutation, addListMutation } from "../query";
import { addListForm } from "../redux/add-list-form";

const useAddListFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(addListForm.selectors.slice);
  return {
    ...slice,
    ...bindActionCreators(addListForm.actions, dispatch),
  };
};

export default () => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const addListFormState = useAddListFormState();

  const submit = async () => {
    const { title, itemInfos } = addListFormState;
    try {
      const listInfo = {
        title,
        description: "",
      };

      const list = await addListMutation(queryCache)(listInfo);

      snackbar.display({
        message: `Created "${list.title}"`,
        action: <ViewListButton listId={list.id} />,
      });

      if (itemInfos.length > 0) {
        const listItemInfo = {
          ...itemInfos[0],
          listId: list.id,
        };
        await addListItemMutation(queryCache)(listItemInfo);
      }
    } catch (error) {
      snackbar.display({ message: `something went wrong` });
      throw error;
    } finally {
      addListFormState.reset();
    }
  };

  return {
    ...addListFormState,
    submit,
  };
};
