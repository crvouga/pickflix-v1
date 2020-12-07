import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../../app/navigation/constants";
import WithAuthentication from "../../user/auth/WithAuthentication";
import RemoveListItemFormModal from "../forms/remove-list-items-form/RemoveListItemFormModal";
import {
  AutoListAggergation,
  isEditorOrOwner,
  ListAggergation,
} from "../query";
import { ListItemActionBar } from "./ListItemActionBar";
import ListItemGrid from "./ListItemGrid";
import ListItemCardCallToAction from "./ListItemCardCallToAction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.appBar,
    position: "sticky",
    top: APP_BAR_HEIGHT,
    // backgroundColor: theme.palette.background.default,
  },
}));

export default ({ list }: { list: ListAggergation | AutoListAggergation }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <RemoveListItemFormModal />

      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          isEditorOrOwner(currentUser.user, list) && (
            <Box className={classes.appBar}>
              <ListItemActionBar list={list} />
            </Box>
          )
        }
      />
      {list.listItemCount === 0 ? (
        <Box p={2}>
          <ListItemCardCallToAction />
        </Box>
      ) : (
        <ListItemGrid list={list} />
      )}
    </React.Fragment>
  );
};
