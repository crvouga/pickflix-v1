import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSnackbar from "../../snackbar/useSnackbar";
import useCurrentUser from "../../users/useCurrentUser";
import {
  deleteAutoListListItem,
  getAutoListListItems,
  GetAutoListListItemsParams,
  postAutoListListItem,
  toAutoListName,
} from "../query";

export default (params: GetAutoListListItemsParams) => {
  const snackbar = useSnackbar();
  const history = useHistory();

  const currentUser = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isExists, setIsExists] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAutoListListItems(params)
      .then((data) => {
        setIsExists(data.length > 0);
      })
      .catch(() => {
        setIsExists(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.autoListKey, params.tmdbMediaId, params.tmdbMediaType]);

  const toggle = async () => {
    if (isLoading || currentUser === null || currentUser === "loading") {
      return;
    }

    setIsLoading(true);

    try {
      if (isExists) {
        await deleteAutoListListItem(params);
        snackbar.display({
          message: `Removed from ${toAutoListName(params.autoListKey)}`,
        });
        setIsExists(false);
      } else {
        await postAutoListListItem(params);
        snackbar.display({
          message: `Added to ${toAutoListName(params.autoListKey)}`,
          action: (
            <Button
              color="primary"
              onClick={() => {
                history.push(
                  `/user/${currentUser.username}/auto-list/${params.autoListKey}`
                );
              }}
            >
              View
            </Button>
          ),
        });
        setIsExists(true);
      }
    } catch (error) {
      snackbar.display({
        message: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isExists,
    isLoading,
    toggle,
  };
};
