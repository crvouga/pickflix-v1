import { Box, makeStyles, Zoom } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import clsx from "clsx";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import NothingHere from "../../common/components/NothingHere";
import { InfiniteScrollBottom } from "../../common/infinite-scroll";
import { ensureArray } from "../../common/utility";
import MoviePosterCard from "../../movie/components/MoviePosterCard";
import {
  MoviePosterGridSkeleton,
  ResponsiveGrid,
} from "../../movie/components/MoviePosterGrid";
import useDeleteListItemsForm from "../forms/remove-list-items-form/useRemoveListItemsForm";
import {
  AutoListAggergation,
  ListAggergation,
  useQueryListItems,
  isEditorOrOwner,
} from "../query";
import WithAuthentication from "../../user/auth/WithAuthentication";
import ListItemCardCallToAction from "./ListItemCardCallToAction";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: fade(theme.palette.background.default, 6 / 10),
  },
}));

export default ({ list }: { list: ListAggergation | AutoListAggergation }) => {
  const listId = "list" in list ? list.list.id : list.autoList.id;

  const classes = useStyles();

  const { listItemIds, isSelecting, toggleDeletion } = useDeleteListItemsForm();

  const query = useQueryListItems({
    listId,
  });

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return (
      <MoviePosterGridSkeleton posterCount={Math.min(list.listItemCount, 20)} />
    );
  }

  const listItems = ensureArray(query.data).flatMap((_) => _.results);

  if (listItems.length === 0) {
    return (
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          isEditorOrOwner(currentUser.user, list) ? (
            <Box paddingX={2}>
              <ListItemCardCallToAction />
            </Box>
          ) : (
            <NothingHere />
          )
        }
        renderDefault={() => <NothingHere />}
      />
    );
  }

  return (
    <React.Fragment>
      <ResponsiveGrid
        items={listItems}
        toItemKey={(listItem) => listItem.listItem.id}
        renderItem={(listItem) => (
          <Box
            position="relative"
            onClick={
              isSelecting
                ? () => {
                    toggleDeletion(listItem.listItem.id);
                  }
                : undefined
            }
          >
            <MoviePosterCard movie={listItem.tmdbData} disabled={isSelecting} />

            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              style={{ pointerEvents: "none" }}
              className={clsx({
                [classes.selected]: listItem.listItem.id in listItemIds,
              })}
            >
              <Box position="absolute" bottom={0} right={0} p={1}>
                <Zoom in={listItem.listItem.id in listItemIds}>
                  <CheckCircleIcon style={{ fontSize: "3em" }} />
                </Zoom>
              </Box>
            </Box>
          </Box>
        )}
      />
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
