import {
  Box,
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
import DeleteListDialog from "./DeleteListDialog";
import EditListDialog from "./EditListDialog";
import * as queryConfigs from "./redux/query-configs";
import CircularProgressBox from "../common/components/CircularProgressBox";
import NavigationBar from "../common/NavigationBar";

export default () => {
  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);
  const dispatch = useDispatch();

  const { listId } = useParams<{ listId: string }>();

  const listRequest = queryConfigs.listRequest({ listId });
  const listItemsRequest = queryConfigs.listItemsRequest({ listId });

  useEffect(() => {
    dispatch(actions.query.requestAsync(listItemsRequest));
    dispatch(actions.query.requestAsync(listRequest));
  }, [listItemsRequest.url, listRequest.url]);

  const listQuery = useSelector(selectors.query.queryState(listRequest));
  const listItemsQuery = useSelector(
    selectors.query.queryState(listItemsRequest)
  );

  const list = useSelector(selectors.lists.list(listId));
  const listItems = useSelector(selectors.lists.listItems(listId));

  return (
    <React.Fragment>
      <NavigationBar title={list?.title} AppBarProps={{ position: "sticky" }} />
      <DeleteListDialog
        list={list}
        open={isDeleteListModalOpen.value}
        onClose={isDeleteListModalOpen.setFalse}
      />
      <EditListDialog
        list={list}
        open={isEditListModalOpen.value}
        onClose={isEditListModalOpen.setFalse}
      />

      <Paper>
        <Box p={2} paddingTop={4} display="flex" flexDirection="row">
          <Box>
            <Typography gutterBottom variant="h5">
              {list?.title}
            </Typography>
            <Typography variant="body1">{list?.description}</Typography>
          </Box>
        </Box>

        <Toolbar>
          <IconButton>
            <GroupAddOutlinedIcon />
          </IconButton>
          {!list?.isAutoCreated && (
            <IconButton onClick={isEditListModalOpen.setTrue}>
              <EditIcon />
            </IconButton>
          )}
          {!list?.isAutoCreated && (
            <IconButton onClick={isDeleteListModalOpen.setTrue}>
              <DeleteIcon />
            </IconButton>
          )}
        </Toolbar>
      </Paper>

      {listItems.length === 0 && (
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
      )}

      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {listItems.map((listItem) => (
          <Box p={1 / 2} width="50%" key={listItem.id}>
            <Poster width="100%" movie={listItem?.tmdbData} />
          </Box>
        ))}
      </Box>

      {(listItemsQuery.isPending || listQuery.isPending) && (
        <CircularProgressBox />
      )}
    </React.Fragment>
  );
};
