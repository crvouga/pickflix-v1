import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  TextField,
  ListItemIcon,
  ListItem,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import * as queryConfigs from "./redux/query-configs";
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();

  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.modal.isOpen("CreateListDialog"));
  const props = useSelector(selectors.modal.props("CreateListDialog"));
  const onClose = () => {
    dispatch(actions.modal.close("CreateListDialog"));
  };

  const [errors, setErrors] = useState({});
  const inputRefTitle = useRef();
  const [visibility, setVisibility] = useState("public");
  const handleChange = (event) => {
    setVisibility(event.target.value);
  };
  const onClickCreate = async () => {
    const listInfo = {
      title: inputRefTitle.current.value,
    };
    try {
      dispatch(
        actions.query.mutateAsync(queryConfigs.createListMutation(listInfo))
      );
    } catch (error) {
    } finally {
      onClose();
    }
  };

  return (
    <Dialog classes={classesDialog} open={isOpen} onClose={onClose}>
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            inputRef={inputRefTitle}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            error={Boolean(errors?.title)}
            helperText={errors?.title?.message}
          />
          {false && (
            <Select fullWidth value={visibility} onChange={handleChange}>
              {[
                {
                  value: "public",
                  icon: <PublicIcon />,
                },
                {
                  value: "private",
                  icon: <LockIcon />,
                },
              ].map(({ value, icon }) => (
                <MenuItem key={value} value={value}>
                  <ListItem>
                    <ListItemText primary={value} />
                    <ListItemIcon>{icon}</ListItemIcon>
                  </ListItem>
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={onClickCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
