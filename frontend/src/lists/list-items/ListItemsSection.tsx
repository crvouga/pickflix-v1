import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../../navigation/constants";
import ListItemActionBar from "./ListItemActionBar";
import ListItemGrid from "./ListItemGrid";

type Props = {
  listId: string;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.appBar,
    position: "sticky",
    top: APP_BAR_HEIGHT,
  },
}));

export default ({ listId }: Props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.appBar}>
        <ListItemActionBar listId={listId} />
      </Box>
      <ListItemGrid listId={listId} />
    </React.Fragment>
  );
};
