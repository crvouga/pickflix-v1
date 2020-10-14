import { Box, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import NavigationBar from "../navigation/NavigationBar";
import { snackbar } from "../snackbar/redux/snackbar";
import DeleteListDialog from "./DeleteListDialog";
import EditListDialog from "./EditListDialog";
import ListItemsSection from "./ListItemsSection";
import { deleteListMutation, getList, queryKeys } from "./query";

export default () => {
  const { listId } = useParams<{ listId: string }>();
  const query = useQuery(queryKeys.list(listId), () => getList({ listId }));
  const dispatch = useDispatch();
  const history = useHistory();

  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const list = query.data;

  const handleDelete = async () => {
    try {
      await deleteListMutation({ listId: list.id });
      dispatch(
        snackbar.actions.display({
          message: "Deleted list",
        })
      );
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: "Failed to delete list",
        })
      );
    } finally {
      history.push("/profile");
    }
  };

  return (
    <React.Fragment>
      <NavigationBar title={list.title} AppBarProps={{ position: "sticky" }} />
      <DeleteListDialog
        open={isDeleteListModalOpen.value}
        onClose={isDeleteListModalOpen.setFalse}
        onDelete={handleDelete}
      />
      <EditListDialog
        listId={list.id}
        open={isEditListModalOpen.value}
        onClose={isEditListModalOpen.setFalse}
      />

      <Paper>
        <Box p={2} paddingTop={4} display="flex" flexDirection="row">
          <Box>
            <Typography variant="h5">{list.title}</Typography>
            <Typography variant="body1">{list.description}</Typography>
          </Box>
        </Box>

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

      <ListItemsSection listId={list.id} />
    </React.Fragment>
  );
};
