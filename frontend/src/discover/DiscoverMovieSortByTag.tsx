import {
  Box,
  Chip,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import {
  DiscoverMovieSortBy,
  DiscoverMovieSortByEnum,
  sortByValueToName,
} from "./query/types";
import { discoverParams } from "./redux/discover-params";

export default () => {
  const sortBy = useSelector(discoverParams.selectors.sortBy);
  const isOpen = useBoolean();
  const dispatch = useDispatch();

  const handleClick = (sortBy: DiscoverMovieSortBy) => () => {
    isOpen.setFalse();
    dispatch(discoverParams.actions.setSortBy(sortBy));
  };

  return (
    <React.Fragment>
      <Chip
        onClick={isOpen.setTrue}
        clickable
        icon={<ArrowDropDownIcon />}
        label={sortByValueToName[sortBy]}
      />
      <Dialog open={isOpen.value} onClose={isOpen.setFalse}>
        <Box zIndex={100} component={Paper} position="sticky" top={0} p={2}>
          <Typography>Sort</Typography>
        </Box>

        <List>
          {Object.entries(DiscoverMovieSortByEnum).map(
            ([sortByValue, sortByName]) => (
              <ListItem
                key={sortByValue}
                button
                onClick={handleClick(sortByValue as DiscoverMovieSortBy)}
                selected={sortBy === sortByValue}
              >
                <ListItemText primary={sortByName} />
              </ListItem>
            )
          )}
        </List>
      </Dialog>
    </React.Fragment>
  );
};
