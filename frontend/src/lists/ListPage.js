import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import Poster from "../movie/components/Poster";
import { actions, selectors } from "../redux";
import EditListDialog from "./EditListDialog";
import * as queryConfigs from "./redux/query-configs";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);
  const dispatch = useDispatch();
  const { listId } = useParams();

  const listRequest = queryConfigs.listRequest({ listId });
  const listItemsRequest = queryConfigs.listItemsRequest({ listId });
  useEffect(() => {
    dispatch(actions.query.requestAsync(listItemsRequest));
    dispatch(actions.query.requestAsync(listRequest));
  }, [listRequest, listItemsRequest, dispatch]);

  const listQuery = useSelector(selectors.query.query(listRequest));
  const listItemsQuery = useSelector(selectors.query.query(listItemsRequest));
  const list = useSelector(selectors.lists.list(listId));
  const listItems = useSelector(selectors.lists.listItems(listId));

  const onClickDeleteList = () => {
    dispatch(actions.lists.deleteList(listId));
  };

  return (
    <React.Fragment>
      {(listItemsQuery.isPending || listQuery.isPending) && <LinearProgress />}
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
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {listItems.map((listItem) => (
          <Box p={1 / 2} width="50%" key={listItem.id}>
            <Poster width="100%" movie={listItem.tmdbData} />
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};
