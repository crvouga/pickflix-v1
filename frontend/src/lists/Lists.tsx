import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import ListListItem from "./ListListItem";
import * as queryConfigs from "./redux/query-configs";

const listRequest = queryConfigs.listsRequest();

export default () => {
  const dispatch = useDispatch();

  const authStatus = useSelector(selectors.auth.authStatus);
  const queryState = useSelector(selectors.query.queryState(listRequest));
  const lists = useSelector(selectors.lists.lists);

  useEffect(() => {
    if (authStatus === "signedIn") {
      dispatch(actions.query.requestAsync(listRequest));
    }
  }, [dispatch, authStatus]);

  const onClickList = (list: { id: string }) => () => {
    dispatch(actions.router.push({ pathname: `/list/${list.id}` }));
  };

  return (
    <React.Fragment>
      {lists.map((list) => (
        <ListListItem key={list.id} onClick={onClickList(list)} list={list} />
      ))}

      {queryState.isPending && (
        <Box color="text.secondary" textAlign="center">
          <CircularProgress size="small" />
        </Box>
      )}
    </React.Fragment>
  );
};
