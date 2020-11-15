import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../common/components/LoadingBox";
import ListCard, { ListCardSkeleton } from "../lists/ListCard";
import { getUsersLists, ListAggergation, queryKeys } from "../lists/query";
import { User } from "./query";

export default ({
  user,
  onClick,
}: {
  onClick?: (list: ListAggergation) => void;
  user: User;
}) => {
  const handleClick = (list: ListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const query = useQuery(queryKeys.userLists(user), () => getUsersLists(user));

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[1, 2, 3].map((n) => (
          <Box key={n} paddingY={1}>
            <ListCardSkeleton />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const lists = query.data.results;

  if (lists.length === 0) {
    return (
      <Box m={6} display="flex" justifyContent="center" alignItems="center">
        <Typography color="textSecondary">No lists</Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {lists.map((list) => (
        <Box key={list.list.id} paddingY={1} onClick={() => handleClick(list)}>
          <ListCard list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};
