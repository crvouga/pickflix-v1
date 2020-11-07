import {
  Box,
  Card,
  Typography,
  CardActionArea,
  ButtonBase,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../common/components/LoadingBox";
import ListImageBox from "./ListImageBox";
import { getUsersLists, queryKeys } from "./query";
import { ListAggergation } from "./query/types";
import AvatarUser from "../auth/AvatarUser";
import ListListItem from "./ListListItem";

export default ({
  username,
  onClick,
}: {
  onClick?: (list: ListAggergation) => void;
  username: string;
}) => {
  const handleClick = (list: ListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const query = useQuery(queryKeys.userLists({ username }), () =>
    getUsersLists({ username })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const lists = query.data;

  return (
    <React.Fragment>
      {lists.map((list) => (
        <Box key={list.list.id} paddingY={1} onClick={() => handleClick(list)}>
          <ListListItem list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};
