import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../../navigation/constants";
import { ListAggergation } from "../query";
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
}: {
  listId: string;
  listItemCount: number;
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.appBar}>
        <ListItemActionBar listId={listId} />
      </Box>
      <ListItemGrid listItemCount={listItemCount} listId={listId} />
    </React.Fragment>
  );
};
