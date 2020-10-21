import { Box, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import { useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import NavigationBar from "../navigation/NavigationBar";
import DeleteListFormModal from "./DeleteListFormModal";
import EditListFormModal from "./EditListFormModal";
import { useQueryList } from "./hooks/query";
import ListItemsSection from "./ListItemsSection";

export default () => {
  const { listId } = useParams<{ listId: string }>();
  const query = useQueryList({ listId });

  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const list = query.data;

  return (
    <React.Fragment>
      <NavigationBar title={list.title} AppBarProps={{ position: "sticky" }} />
      <DeleteListFormModal
        listId={list.id}
        open={isDeleteListModalOpen.value}
        onClose={isDeleteListModalOpen.setFalse}
      />

      <EditListFormModal
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
