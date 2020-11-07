import { Box, Card, Typography, CardActionArea } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../common/components/LoadingBox";
import ListImageBox from "./ListImageBox";
import { getUsersLists, queryKeys } from "./query";
import { ListAggergation } from "./query/types";

export const MediaList = ({ list }: { list: ListAggergation }) => {
  return (
    <CardActionArea>
      <Box display="flex" width="100%">
        <Box width="100px">
          <ListImageBox list={list} width="100%" height="100%" />
        </Box>
        <Box p={2}>
          <Typography variant="h5">{list.list.title}</Typography>
          <Typography>{list.listItemCount} items</Typography>
        </Box>
      </Box>
    </CardActionArea>
  );
};

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
          <MediaList list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};
