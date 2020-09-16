import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import useBoolean from "../common/hooks/useBoolean";
import Poster from "../movie/components/Poster";
import { actions } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
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

  const listItemsQuery = useQuery(["list", listId, "list-items"], () =>
    backendAPI.get(`/api/lists/${listId}/list-items`).then((res) => res.data)
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
      {listItemsQuery.status === "loading" && (
        <Box textAlign="center" p={2}>
          <CircularProgress />
        </Box>
      )}
      {listItemsQuery.status === "success" && (
        <React.Fragment>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            {(listItemsQuery.data || []).map((listItem) => (
              <Box p={1 / 2} width="50%" key={listItem.id}>
                <Poster width="100%" movie={listItem.tmdbData} />
              </Box>
            ))}
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
