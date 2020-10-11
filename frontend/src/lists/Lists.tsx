import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import CircularProgressBox from "../common/components/CircularProgressBox";
import ErrorBox from "../common/components/ErrorBox";
import { getLists, queryKeys } from "./query";
import ListListItem from "./ListListItem";

export default () => {
  const history = useHistory();
  const onClickList = (list: { id: string }) => () => {
    history.push(`/list/${list.id}`);
  };

  const query = useQuery(queryKeys.lists(), getLists);

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <CircularProgressBox />;
  }

  const lists = query.data;

  return (
    <React.Fragment>
      {lists.map((list) => (
        <ListListItem key={list.id} onClick={onClickList(list)} list={list} />
      ))}
    </React.Fragment>
  );
};
