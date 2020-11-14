import React, { useState } from "react";
import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import {
  addListItemMutation,
  addListMutation,
  postList,
  postListItem,
} from "../query";
import { addListForm } from "../redux/add-list-form";
import { TmdbMediaType } from "../../tmdb/types";

const useAddListFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(addListForm.selectors.slice);
  const actions = bindActionCreators(addListForm.actions, dispatch);
  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);
  const reset = () => {
    setErrors([]);
    actions.reset();
  };
  return {
    ...slice,
    ...actions,
    errors,
    setErrors,
    reset,
  };
};

export default () => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const addListFormState = useAddListFormState();

  const submit = async ({ title }: { title: string }) => {
    const { itemInfos } = addListFormState;
    try {
      const list = await postList({
        title,
        description: "",
      });

      snackbar.display({
        message: `Created "${list.title}"`,
        action: <ViewListButton listId={list.id} />,
      });

      if (itemInfos[0]) {
        await postListItem({
          mediaId: {
            tmdbMediaId: Number(itemInfos[0].tmdbMediaId),
            tmdbMediaType: itemInfos[0].tmdbMediaType as TmdbMediaType,
          },
          listId: list.id,
        });
      }
    } catch (error) {
      const errors = error?.response?.data?.errors || [];
      if (errors.length > 0) {
        addListFormState.setErrors(errors);
      }
      throw error;
    } finally {
      queryCache.invalidateQueries((query) => query.queryKey.includes("lists"));
    }
  };

  return {
    ...addListFormState,
    submit,
  };
};
