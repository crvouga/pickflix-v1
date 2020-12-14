import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import useModal from "../../../app/modals/useModal";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import { DiscoverMovieTagGroup } from "../../DiscoverMovieTag";
import { IDiscoverTag } from "../../query/types";
import useDiscoverState from "../../redux/useDiscoverState";

export const DiscoverTagsHistoryForm = () => {
  const { setActiveTagsById, activeTagState } = useDiscoverState();
  const { close } = useModal("DiscoverTagsForm");

  const handleClick = (tagsById: { [id: string]: IDiscoverTag }) => {
    close();
    setActiveTagsById(tagsById);
  };

  const isClearHistoryDialogOpen = useBoolean(false);

  const futureStates = activeTagState.future.filter(
    (state) => Object.keys(state.activeTagsById).length > 0
  );

  const presentState = activeTagState.present;

  const pastStates = activeTagState.past.filter(
    (state) => Object.keys(state.activeTagsById).length > 0
  );

  return (
    <List>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="History"
        />

        <ListItemSecondaryAction>
          <IconButton onClick={isClearHistoryDialogOpen.setTrue}>
            <Box color="text.secondary">
              <DeleteIcon style={{ color: "inherit" }} />
            </Box>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Dialog
        TransitionComponent={ZoomIn}
        open={isClearHistoryDialogOpen.value}
        onClose={isClearHistoryDialogOpen.setFalse}
      >
        <DialogTitle>Clear History?</DialogTitle>
        <DialogActions>
          <Button size="large" onClick={isClearHistoryDialogOpen.setFalse}>
            Cancel
          </Button>
          <Button
            size="large"
            onClick={() => {
              isClearHistoryDialogOpen.setFalse();
              activeTagState.clearHistory();
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>

      {futureStates.length > 0 && (
        <React.Fragment>
          <ListSubheader>Future</ListSubheader>
          {futureStates.map(({ activeTagsById }, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                handleClick(activeTagsById);
              }}
            >
              <DiscoverMovieTagGroup
                tagsById={activeTagsById}
                ChipProps={{ variant: "outlined" }}
              />
            </ListItem>
          ))}
          <Divider />
        </React.Fragment>
      )}

      {Object.keys(presentState.activeTagsById).length > 0 && (
        <React.Fragment>
          <ListSubheader>Present</ListSubheader>
          <ListItem
            button
            onClick={() => {
              handleClick(presentState.activeTagsById);
            }}
          >
            <DiscoverMovieTagGroup
              tagsById={presentState.activeTagsById}
              ChipProps={{ variant: "outlined" }}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}

      {pastStates.length > 0 && (
        <React.Fragment>
          <ListSubheader>Past</ListSubheader>
          {pastStates.map(({ activeTagsById }, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                handleClick(activeTagsById);
              }}
            >
              <DiscoverMovieTagGroup
                tagsById={activeTagsById}
                ChipProps={{ variant: "outlined" }}
              />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};
