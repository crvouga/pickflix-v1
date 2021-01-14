import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React, { useState } from "react";
import {
  AutoListCardGridContainer,
  ListCardGridContainer,
} from "../list/lists/card/ListCardGrid";
import { UserAggergation } from "./query";

export enum Filter {
  Owner = "Owner",
  Editor = "Editor",
}

export default ({ user }: { user: UserAggergation }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Auto Lists
        </Typography>

        <AutoListCardGridContainer
          ownerId={user.user.id}
          count={user.autoListCount}
          // ItemProps={{ xs: 12 }}
        />
      </Box>
      <Box p={2}>
        <Box display="flex" alignItems="center" paddingBottom={1}>
          <Box flex={1} display="flex" alignItems="center">
            <Box marginRight={1}>
              <Typography variant="h5">Lists</Typography>
            </Box>

            {selectedFilter !== null && (
              <Chip
                size="small"
                clickable
                variant="outlined"
                label={selectedFilter}
                onClick={() => {
                  setSelectedFilter(null);
                }}
                onDelete={() => {
                  setSelectedFilter(null);
                }}
              />
            )}
          </Box>
          <IconButton onClick={handleClick}>
            <FilterListOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {Object.values(Filter).map((filter) => (
              <MenuItem
                key={filter}
                selected={filter === selectedFilter}
                onClick={() => {
                  setSelectedFilter((selectedFilter) =>
                    selectedFilter === filter ? null : filter
                  );
                  handleClose();
                }}
              >
                {filter}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <ListCardGridContainer
          GetListParams={
            selectedFilter === Filter.Editor
              ? { editorId: user.user.id }
              : selectedFilter === Filter.Owner
              ? { ownerId: user.user.id }
              : { userId: user.user.id }
          }
          count={
            selectedFilter === Filter.Editor
              ? user.editorListCount
              : selectedFilter === Filter.Owner
              ? user.ownerListCount
              : user.listCount
          }
        />
      </Box>
    </React.Fragment>
  );
};
