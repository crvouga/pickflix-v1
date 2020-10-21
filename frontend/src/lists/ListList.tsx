import React from "react";
import { useHistory } from "react-router";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import ListListItem from "./ListListItem";
import { useQueryLists } from "./hooks/query";

export default () => {
  const history = useHistory();

  const onClickList = (list: { id: string }) => () => {
    history.push(`/list/${list.id}`);
  };

  const query = useQueryLists();

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
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
