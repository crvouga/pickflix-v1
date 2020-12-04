import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../../app/navigation/constants";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { User } from "../../user/query";
import RemoveListItemFormModal from "../forms/remove-list-items-form/RemoveListItemFormModal";
import ListItemActionBar from "./ListItemActionBar";
import ListItemGrid from "./ListItemGrid";
import { ListAggergation, AutoList, AutoListAggergation } from "../query";

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
          list.owner.id === currentUser.user.id && (
            <Box className={classes.appBar}>
              <ListItemActionBar list={list} />
            </Box>
          )
        }
      />
      <ListItemGrid list={list} />
    </React.Fragment>
  );
};
