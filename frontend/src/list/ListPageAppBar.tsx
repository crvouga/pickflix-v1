import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import BackButton from "../app/navigation/BackButton";
import { pluralize } from "../common/utility";
import useRemoveListItemsForm from "./forms/remove-list-items-form/useRemoveListItemsForm";

export default ({ title }: { title: string }) => {
  const { isSelecting, selectedCount } = useRemoveListItemsForm();

  const selectingTitle = `${pluralize(selectedCount, "item")} selected`;

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <BackButton />
        <Typography variant="h6" noWrap>
          {isSelecting ? selectingTitle : title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
