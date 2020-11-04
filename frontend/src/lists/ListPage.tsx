import {
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Hidden,
  AppBar,
  Container,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import { useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import DeleteListFormModal from "./DeleteListFormModal";
import EditListFormModal from "./EditListFormModal";
import { useQueryList } from "./hooks/query";
import ListItemsSection from "./ListItemsSection";
import BackButton from "../navigation/BackButton";

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
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <BackButton />
            <Typography variant="h6">{list.title}</Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

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

      <Box paddingBottom={2}>
        <Paper>
          <Container maxWidth="md">
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
          </Container>
        </Paper>
      </Box>
      <Container maxWidth="md">
        <ListItemsSection listId={list.id} />
      </Container>
    </React.Fragment>
  );
};
