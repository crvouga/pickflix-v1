import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import MediaEntity from "../common/MediaEntity";
import { selectors } from "../redux";

export default () => {
  const recentlyViewedEntities = useSelector(selectors.recentlyViewed.entities);

  return (
    <React.Fragment>
      <Box paddingLeft={2}>
        <Typography variant="h6">Recent</Typography>
      </Box>
      <HorizontalScroll paddingLeft={2}>
        {recentlyViewedEntities.map((entity) => (
          <MediaEntity
            width="100px"
            key={entity.id}
            entity={entity}
            marginRight={1}
          />
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
