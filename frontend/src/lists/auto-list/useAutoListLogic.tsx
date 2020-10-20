import { Button } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { snackbar } from "../../snackbar/redux/snackbar";
import { TmdbMediaType } from "../../tmdb/types";
import { getAutoList, queryKeys } from "../query";
import { addListItemMutation } from "../query/mutation/add-list-item";
import { AutoListKey } from "../types";

const SeeListButton = ({ autoListKey }: { autoListKey: AutoListKey }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/auto-list/${autoListKey}`);
  };

  return (
    <Button color="primary" onClick={handleClick}>
      See List
    </Button>
  );
};

export default (autoListKey: AutoListKey) => {
  const queryKey = queryKeys.autoList(autoListKey);

  const query = useQuery(queryKey, () => getAutoList(autoListKey));

  const dispatch = useDispatch();

  if (query.error || !query.data) {
    return {
      query,
    };
  }

  const autoList = query.data;

  const add = async ({
    tmdbMediaType,
    tmdbMediaId,
  }: {
    tmdbMediaType: TmdbMediaType;
    tmdbMediaId: string;
  }) => {
    try {
      await addListItemMutation({
        listId: autoList.id,
        tmdbMediaId,
        tmdbMediaType,
      });
      dispatch(
        snackbar.actions.display({
          message: `Added to ${autoList.title}`,
          action: <SeeListButton autoListKey={autoListKey} />,
        })
      );
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: `Failed to add to ${autoList.title}`,
        })
      );
    }
  };

  const remove = async ({
    tmdbMediaType,
    tmdbMediaId,
  }: {
    tmdbMediaType: TmdbMediaType;
    tmdbMediaId: string;
  }) => {
    try {
      dispatch(
        snackbar.actions.display({
          message: `Added to ${autoList.title}`,
          action: <SeeListButton autoListKey={autoListKey} />,
        })
      );
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: `Failed to add to ${autoList.title}`,
        })
      );
    }
  };

  return {
    status: "success",
    add,
    remove,
    query,
  };
};
