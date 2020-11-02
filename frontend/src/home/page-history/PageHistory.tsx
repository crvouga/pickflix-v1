import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useDispatch } from "react-redux";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import ClearDialog from "./ClearDialog";
import Entity from "./Entity";
import usePageHistory from "./usePageHistory";

export default () => {
  const pageHistory = usePageHistory();
  const open = useBoolean();

  if (pageHistory.entities.length === 0) {
    return null;
  }

  const handleClear = () => {
    pageHistory.clear();
    open.setFalse();
  };

  return (
    <React.Fragment>
      <ClearDialog
        open={open.value}
        onClose={open.setFalse}
        onClear={handleClear}
      />

      <Box paddingX={2} paddingBottom={1}>
        <Typography variant="h6">Recent</Typography>
      </Box>

      <HorizontalScroll paddingLeft={2}>
        {pageHistory.entities.slice(0, 25).map((entity) => (
          <Box key={entity.id} marginRight={1} width="180px">
            <Entity entity={entity} />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
