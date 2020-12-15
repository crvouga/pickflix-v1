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
import { DiscoverTagGroup } from "../../DiscoverTag";
import { IDiscoverTag } from "../../query/types";
import useDiscoverState from "../../redux/useDiscoverState";
import NothingHere from "../../../common/components/NothingHere";

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

  const disabled = futureStates.length === 0 && pastStates.length === 0;

  return (
    <List>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="History"
        />

        <ListItemSecondaryAction>
          <IconButton
            disabled={disabled}
            onClick={isClearHistoryDialogOpen.setTrue}
          >
            <Box color={disabled ? "action.disabled" : "text.secondary"}>
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

      {disabled && Object.keys(presentState.activeTagsById).length === 0 && (
        <NothingHere />
      )}

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
              <DiscoverTagGroup
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
            <DiscoverTagGroup
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
              <DiscoverTagGroup
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
