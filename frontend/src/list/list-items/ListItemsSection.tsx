import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../../app/navigation/constants";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { User } from "../../user/query";
import RemoveListItemFormModal from "../forms/remove-list-items-form/RemoveListItemFormModal";
import ListItemActionBar from "./ListItemActionBar";
import ListItemGrid from "./ListItemGrid";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.appBar,
    position: "sticky",
    top: APP_BAR_HEIGHT,
    // backgroundColor: theme.palette.background.default,
  },
}));

export default ({
  listId,
  listItemCount,
  owner,
}: {
  owner: User;
  listId: string;
  listItemCount: number;
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <RemoveListItemFormModal />

      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          owner.id === currentUser.user.id && (
            <Box className={classes.appBar}>
              <ListItemActionBar listId={listId} />
            </Box>
          )
        }
      />
      <ListItemGrid listItemCount={listItemCount} listId={listId} />
    </React.Fragment>
  );
};
