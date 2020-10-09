import React, { useEffect } from "react";
import { useQuery, queryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressBox from "../common/components/CircularProgressBox";
import ErrorBox from "../common/components/ErrorBox";
import { actions, selectors } from "../redux";
import { fetchLists, queryKeys } from "./data";
import ListListItem from "./ListListItem";
import { useHistory } from "react-router";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery(queryKeys.lists(), () => fetchLists());

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <CircularProgressBox />;
  }

  const lists = query.data;

  const onClickList = (list: { id: string }) => () => {
    history.push(`/list/${list.id}`);
  };

  return (
    <React.Fragment>
      {lists.map((list) => (
        <ListListItem key={list.id} onClick={onClickList(list)} list={list} />
      ))}
    </React.Fragment>
  );
};
