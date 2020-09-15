import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  Paper,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import MovieOutlinedIcon from "@material-ui/icons/MovieOutlined";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import useBoolean from "../common/hooks/useBoolean";
import { actions } from "../redux";
import { useDispatch } from "react-redux";
import EditListDialog from "./EditListDialog";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const dispatch = useDispatch();
  const { listId } = useParams();

  const query = useQuery(["list", listId], () =>
    backendAPI.get(`/api/lists/${listId}`).then((res) => res.data)
  );

  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);

  if (query.status === "loading") {
    return (
      <Box textAlign="center" marginTop={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (query.status === "error") {
    return "error";
  }

  const list = query.data || {};

  const onClickDeleteList = () => {
    dispatch(actions.lists.deleteList(listId));
  };

  return (
    <React.Fragment>
      <Paper>
        <EditListDialog
          list={list}
          open={isEditListModalOpen.value}
          onClose={isEditListModalOpen.setFalse}
        />
        <Box p={2} paddingTop={4} display="flex" flexDirection="row">
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              style={{ workBreak: "break-all" }}
            >
              {list.title}
            </Typography>
            <Typography variant="body1">{list.description}</Typography>
          </Box>
        </Box>
        <Dialog
          classes={classesDialog}
          open={isDeleteListModalOpen.value}
          onClose={isDeleteListModalOpen.setFalse}
        >
          <DialogTitle>Delete list?</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={isDeleteListModalOpen.setFalse}>
              Cancel
            </Button>
            <Button color="primary" onClick={onClickDeleteList}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Toolbar>
          <IconButton>
            <GroupAddOutlinedIcon />
          </IconButton>
          <IconButton onClick={isEditListModalOpen.setTrue}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={isDeleteListModalOpen.setTrue}>
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </Paper>
    </React.Fragment>
  );
};
