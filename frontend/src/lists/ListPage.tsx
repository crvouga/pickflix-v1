import { Box, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import LoadingBox from "../common/components/LoadingBox";
import ErrorBox from "../common/components/ErrorBox";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import Poster from "../movie/components/MoviePosterCard";
import NavigationBar from "../navigation/NavigationBar";
import { actions } from "../redux";
import { getList, getListItems, queryKeys, deleteListMutation } from "./query";
import DeleteListDialog from "./DeleteListDialog";
import EditListDialog from "./EditListDialog";
import { snackbar } from "../snackbar/redux/snackbar";

type ListItemsProps = {
  listId: string;
};

export const ListItems = (props: ListItemsProps) => {
  const { listId } = props;
  const query = useQuery(queryKeys.listItems(listId), () =>
    getListItems({ listId })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const listItems = query.data;

  if (listItems.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="200px"
      >
        <Typography align="center" color="textSecondary" variant="h6">
          There's nothing here
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {listItems.map((listItem) => (
        <Box p={1 / 2} width="50%" key={listItem.id}>
          <Poster movie={listItem?.tmdbData} />
        </Box>
      ))}
    </Box>
  );
};

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
            <Typography variant="h5">{list?.title}</Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {list?.isAutoCreated ? "Auto list" : ""}
            </Typography>
            <Typography variant="body1">{list?.description}</Typography>
          </Box>
        </Box>

        <Toolbar>
          <IconButton>
            <GroupAddOutlinedIcon />
          </IconButton>

          <IconButton onClick={isEditListModalOpen.setTrue}>
            <EditIcon />
          </IconButton>

          {!list?.isAutoCreated && (
            <IconButton onClick={isDeleteListModalOpen.setTrue}>
              <DeleteIcon />
            </IconButton>
          )}
        </Toolbar>
      </Paper>

      <ListItems listId={listId} />
    </React.Fragment>
  );
};
