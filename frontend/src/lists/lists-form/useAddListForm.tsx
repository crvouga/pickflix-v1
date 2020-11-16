import React from "react";
import { useQueryCache } from "react-query";
import { ViewListButton } from "../../snackbar/Snackbar";
import useSnackbar from "../../snackbar/useSnackbar";
import { TmdbMediaType } from "../../tmdb/types";
import { postList, postListItem } from "../query";
import { useAddListFormState } from "./add-list-form";

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
