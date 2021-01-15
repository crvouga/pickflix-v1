import { AppBar } from "@material-ui/core";
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

export default ({ list }: { list: ListAggergation | AutoListAggergation }) => {
  return (
    <React.Fragment>
      <RemoveListItemFormModal />

      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          isEditorOrOwner(currentUser.user, list) && (
            <AppBar
              color="transparent"
              elevation={0}
              position="sticky"
              style={{ top: APP_BAR_HEIGHT }}
            >
              <ListItemActionBar list={list} />
            </AppBar>
          )
        }
      />

      <ListItemGrid list={list} />
    </React.Fragment>
  );
};
